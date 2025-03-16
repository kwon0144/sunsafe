interface TitleProps {
    title: string;
    description: string;
}

const Title = ({ title, description }: TitleProps) => {
    return (
        <div className='mb-10'>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    )
}

export default Title;