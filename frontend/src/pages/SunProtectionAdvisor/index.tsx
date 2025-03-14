// SunProtectionAdvisor.jsx
import React, { useState, useEffect } from 'react';
import styles from './SunProtectionAdvisor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, faSpinner, faInfoCircle, faArrowRight,
  faMapMarkerAlt, faUser, faClock, faNotesMedical, faRunning
} from '@fortawesome/free-solid-svg-icons';

// API URL - Change this to your FastAPI backend URL
const API_URL = 'http://localhost:8000';

// Skin tone options
const SKIN_TONES = [
  { value: "", label: "Select skin tone" },
  { value: "fair", label: "Fair (burns easily, rarely tans)" },
  { value: "light", label: "Light (burns easily, tans minimally)" },
  { value: "medium", label: "Medium (burns moderately, tans gradually)" },
  { value: "olive", label: "Olive (burns minimally, tans easily)" },
  { value: "brown", label: "Brown (rarely burns, tans darkly)" },
  { value: "dark", label: "Dark (almost never burns)" }
];

// Skin condition options
const SKIN_CONDITIONS = [
  { value: "", label: "Select skin condition" },
  { value: "normal", label: "Normal" },
  { value: "sensitive", label: "Sensitive" },
  { value: "acne", label: "Acne-prone" },
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "rosacea", label: "Rosacea" },
  { value: "eczema", label: "Eczema" },
  { value: "hyperpigmentation", label: "Hyperpigmentation" }
];

// Activity options
const ACTIVITIES = [
  { value: "", label: "Select activity" },
  { value: "daily", label: "Daily routine" },
  { value: "office", label: "Office work" },
  { value: "swimming", label: "Swimming" },
  { value: "beach", label: "Beach day" },
  { value: "sports", label: "Sports/Exercise" },
  { value: "hiking", label: "Hiking" },
  { value: "skiing", label: "Skiing/Winter sports" },
  { value: "gardening", label: "Gardening" },
  { value: "outdoor work", label: "Outdoor work" }
];

// Define types for our data
interface UvIndexData {
  uv_index: number;
  [key: string]: any;
}

interface DetectedEntities {
  skin_tone?: string;
  age_group?: string;
  exact_age?: string;
  skin_condition?: string;
  activity?: string;
  location?: string;
  uv_index?: number;
  latitude?: number;
  longitude?: number;
  date_time?: string;
  [key: string]: any;
}

interface ResultData {
  query: string;
  recommendation: string;
  category: string;
  confidence: number;
  detected_entities?: DetectedEntities;
  [key: string]: any;
}

interface ExampleQuestions {
  [category: string]: string[];
}

function SunProtectionAdvisor() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [age, setAge] = useState('');
  const [skinCondition, setSkinCondition] = useState('');
  const [activity, setActivity] = useState('');
  
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [history, setHistory] = useState<ResultData[]>([]);
  const [uvIndex, setUvIndex] = useState<UvIndexData | null>(null);

  // Example questions for each category
  const exampleQuestions: ExampleQuestions = {
    spf_recommendation: [
      "What SPF should I use if I burn easily?",
      "Is SPF 15 enough for daily use?",
      "What SPF is best for fair skin?"
    ],
    application_timing: [
      "How often should I reapply sunscreen?",
      "When should I apply sunscreen before going outside?",
      "Do I need to reapply waterproof sunscreen?"
    ],
    product_type: [
      "Best sunscreen for oily skin?",
      "What's better, spray or lotion sunscreen?",
      "Are mineral sunscreens effective?"
    ],
    general_advice: [
      "Do I need sunscreen on cloudy days?",
      "Is sunscreen necessary in winter?",
      "Can I get vitamin D while wearing sunscreen?"
    ],
    sensitive_skin: [
      "Best sunscreen for sensitive skin?",
      "Sunscreen options for rosacea?",
      "Will sunscreen irritate my sensitive skin?"
    ],
    special_group: [
      "What SPF should children use?",
      "Is sunscreen safe for babies?",
      "Sun protection for elderly people?"
    ]
  };

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }

    fetchCategories();
    
    // Try to get user location for UV index
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchUvIndex(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error('Error getting location:', err);
        }
      );
    }
  }, []);
  
  // Function to fetch UV index
  const fetchUvIndex = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`${API_URL}/uv-index?latitude=${latitude}&longitude=${longitude}`);
      if (response.ok) {
        const data = await response.json();
        setUvIndex(data);
      }
    } catch (err) {
      console.error('Error fetching UV index:', err);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const requestData: {
        query: string;
        location: string | null;
        skin_tone: string | null;
        age: string | null;
        skin_condition: string | null;
        activity: string | null;
        [key: string]: string | null;
      } = { 
        query,
        location: location || null,
        skin_tone: skinTone || null,
        age: age || null,
        skin_condition: skinCondition || null,
        activity: activity || null
      };
      
      // Remove null values
      Object.keys(requestData).forEach(key => {
        if (requestData[key] === null) {
          delete requestData[key];
        }
      });

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data: ResultData = await response.json();
      setResult(data);
      
      // Add to history
      setHistory(prev => [data, ...prev].slice(0, 5));
      
      // Clear query
      setQuery('');
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setError('Failed to get recommendation. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to set a question example
  const setExampleQuestion = (question: string) => {
    setQuery(question);
  };

  // Function to format category name for display
  const formatCategory = (category: string) => {
    if (!category) return '';
    return category
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Function to reset form fields
  const resetForm = () => {
    setQuery('');
    setLocation('');
    setSkinTone('');
    setAge('');
    setSkinCondition('');
    setActivity('');
  };
  
  // Function to get UV index severity class
  const getUvIndexClass = (index: number) => {
    if (!index) return '';
    if (index < 3) return styles.uvLow;
    if (index < 6) return styles.uvModerate;
    if (index < 8) return styles.uvHigh;
    if (index < 11) return styles.uvVeryHigh;
    return styles.uvExtreme;
  };

  return (
    <div className={styles.sunProtectionApp}>
      <header className={styles.appHeader}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faSun} className={styles.sunIcon} />
          <h1>Sun Protection Advisor</h1>
        </div>
        <p className={styles.subtitle}>
          Get personalized sun protection recommendations powered by AI
        </p>
        
        {uvIndex && (
          <div className={`${styles.uvIndex} ${getUvIndexClass(uvIndex.uv_index)}`}>
            Current UV Index: <strong>{uvIndex.uv_index.toFixed(1)}</strong>
          </div>
        )}
      </header>

      <main className={styles.appMain}>
        <section className={styles.querySection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about sunscreen, UV protection, or sun safety..."
                className={styles.queryInput}
              />
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading || !query.trim()}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <FontAwesomeIcon icon={faArrowRight} />
                )}
              </button>
            </div>
            
            <div className={styles.advancedToggle}>
              <button 
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className={styles.toggleBtn}
              >
                {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
              </button>
            </div>
            
            {showAdvancedOptions && (
              <div className={styles.advancedOptions}>
                <div className={styles.optionRow}>
                  <div className={styles.optionField}>
                    <label>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., New York, Beach, Mountains"
                    />
                  </div>
                  
                  <div className={styles.optionField}>
                    <label>
                      <FontAwesomeIcon icon={faUser} /> Skin Tone
                    </label>
                    <select 
                      value={skinTone}
                      onChange={(e) => setSkinTone(e.target.value)}
                    >
                      {SKIN_TONES.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className={styles.optionRow}>
                  <div className={styles.optionField}>
                    <label>
                      <FontAwesomeIcon icon={faClock} /> Age
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 30, child, infant"
                    />
                  </div>
                  
                  <div className={styles.optionField}>
                    <label>
                      <FontAwesomeIcon icon={faNotesMedical} /> Skin Condition
                    </label>
                    <select
                      value={skinCondition}
                      onChange={(e) => setSkinCondition(e.target.value)}
                    >
                      {SKIN_CONDITIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className={styles.optionRow}>
                  <div className={styles.optionField}>
                    <label>
                      <FontAwesomeIcon icon={faRunning} /> Activity
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                    >
                      {ACTIVITIES.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.optionField}>
                    <button 
                      type="button"
                      onClick={resetForm}
                      className={styles.resetBtn}
                    >
                      Reset All Fields
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.exampleQuestions}>
            <h3>Example Questions:</h3>
            <div className={styles.questionChips}>
              {Object.keys(exampleQuestions).slice(0, 4).map(category => (
                exampleQuestions[category][0] && (
                  <button 
                    key={exampleQuestions[category][0]} 
                    className={styles.questionChip}
                    onClick={() => setExampleQuestion(exampleQuestions[category][0])}
                  >
                    {exampleQuestions[category][0]}
                  </button>
                )
              ))}
            </div>
          </div>
        </section>

        {result && (
          <section className={styles.resultSection}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <h2>Recommendation</h2>
                <span className={styles.categoryTag}>
                  {formatCategory(result.category)}
                </span>
              </div>
              <div className={styles.resultQuery}>
                <strong>Your question:</strong> {result.query}
              </div>
              <div className={styles.resultRecommendation}>
                {result.recommendation}
              </div>
              
              {result.detected_entities && Object.keys(result.detected_entities).some(key => 
                result.detected_entities[key] !== null && 
                !['latitude', 'longitude', 'date_time'].includes(key)
              ) && (
                <div className={styles.detectedEntities}>
                  <h4>Detected Information:</h4>
                  <ul>
                    {result.detected_entities.skin_tone && (
                      <li>Skin tone: {result.detected_entities.skin_tone}</li>
                    )}
                    {(result.detected_entities.age_group || result.detected_entities.exact_age) && (
                      <li>Age: {result.detected_entities.exact_age || result.detected_entities.age_group}</li>
                    )}
                    {result.detected_entities.skin_condition && (
                      <li>Skin condition: {result.detected_entities.skin_condition}</li>
                    )}
                    {result.detected_entities.activity && (
                      <li>Activity: {result.detected_entities.activity}</li>
                    )}
                    {result.detected_entities.location && (
                      <li>Location: {result.detected_entities.location}</li>
                    )}
                    {result.detected_entities.uv_index && (
                      <li>UV Index: {result.detected_entities.uv_index.toFixed(1)}</li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className={styles.resultConfidence}>
                <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
                Confidence: {Math.round(result.confidence * 100)}%
              </div>
            </div>
          </section>
        )}

        {history.length > 0 && (
          <section className={styles.historySection}>
            <h2>Recent Searches</h2>
            <div className={styles.historyCards}>
              {history.map((item, index) => (
                <div className={styles.historyCard} key={index}>
                  <div className={styles.historyCategory}>{formatCategory(item.category)}</div>
                  <div className={styles.historyQuery}>{item.query}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className={styles.appFooter}>
        <p>© 2023 Sun Protection Advisor - Powered by AI</p>
      </footer>
    </div>
  );
}

export default SunProtectionAdvisor; 