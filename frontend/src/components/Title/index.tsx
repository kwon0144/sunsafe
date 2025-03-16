interface TitleProps {
    title: string;
    description: string;
}

const Title = ({ title, description }: TitleProps) => {
    return (
        <div className='mb-20'>
            <h1 className="text-3xl font-bold text-amber-900">{title}</h1>
            <p className="mt-2 font-semibold text-amber-800">{description}</p>
        </div>
    )
}

export default Title;