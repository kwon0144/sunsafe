import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SunProtectionTips = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sun Protection Tips</h2>
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} loop={true}
                className="h-[200px] flex items-center justify-center">
                {/* Tip 1 */}
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-semibold mb-4">Tip #1</h3>
                        <p className="text-gray-600 text-center max-w-[600px]">
                            Apply sunscreen 15-30 minutes before sun exposure for optimal protection.
                        </p>
                    </div>
                </SwiperSlide>

                {/* Tip 2 */}
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-semibold mb-4">Tip #2</h3>
                        <p className="text-gray-600 text-center max-w-[600px]">
                            Use broad-spectrum sunscreen to protect against both UVA and UVB rays.
                        </p>
                    </div>
                </SwiperSlide>

                {/* Tip 3 */}
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-semibold mb-4">Tip #3</h3>
                        <p className="text-gray-600 text-center max-w-[600px]">
                            Reapply sunscreen every 2 hours, especially after swimming or sweating.
                        </p>
                    </div>
                </SwiperSlide>

                {/* Tip 4 */}
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-semibold mb-4">Tip #4</h3>
                        <p className="text-gray-600 text-center max-w-[600px]">
                            Don't forget to protect your lips with SPF lip balm.
                        </p>
                    </div>
                </SwiperSlide>

                {/* Tip 5 */}
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-semibold mb-4">Tip #5</h3>
                        <p className="text-gray-600 text-center max-w-[600px]">
                            Wear protective clothing, hats, and sunglasses for extra sun safety.
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SunProtectionTips; 