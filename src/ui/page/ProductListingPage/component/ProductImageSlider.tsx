import React, {useState} from "react";

type Props = {
    slides: { url: string; title: string; targetUrl?: string; }[]
}

export const ProductImageSlider = ({ slides }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const goToPrevious = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1
            : currentIndex - 1;
            setCurrentIndex(newIndex);
    }

    const goToNext = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0
            : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const handleSlideClick = () => {
        const targetUrl = slides[currentIndex].targetUrl;
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }

    const sliderStyles: React.CSSProperties = {
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '2px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`
    }

    const leftArrowStyles: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '0px',
        backgroundImage: 'url("https://i.ibb.co/Gd7CQ1j/left-arrow.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '60px',
        height: '60px',
        color: 'orangered',
        zIndex: 1,
        cursor: 'pointer'
    }

    const rightArrowStyles: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '0px',
        backgroundImage: 'url("https://i.ibb.co/ZNjD9jm/right-arrow.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '60px',
        height: '60px',
        color: 'orangered',
        zIndex: 1,
        cursor: 'pointer'
    }

    return (
        <div style={sliderStyles} onClick={handleSlideClick}>
            <div style={leftArrowStyles} onClick={goToPrevious}></div>
            <div style={rightArrowStyles} onClick={goToNext}></div>
            <div style={slideStyles}></div>
        </div>
    )
}