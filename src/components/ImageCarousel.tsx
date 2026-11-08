"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PortfolioImage } from "./PortfolioUI";
interface ImageCarouselProps {
  images: string[];
  title: string;
}
export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const move = (step: number) =>
    setIndex((current) => (current + step + images.length) % images.length);
  const close = () => dialog.current?.close();
  if (!images.length)
    return (
      <div className="portfolio-empty-gallery">No screenshots available</div>
    );
  return (
    <div className="portfolio-gallery">
      <div className="portfolio-gallery-stage">
        <button
          ref={trigger}
          className="portfolio-gallery-open"
          onClick={() => dialog.current?.showModal()}
          aria-label={`Open gallery: ${title}`}
        >
          <PortfolioImage
            key={images[index]}
            src={images[index]}
            alt={`${title} - screenshot ${index + 1}`}
            contain
            eager
            sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1152px) calc(100vw - 48px), 1104px"
          />
        </button>
        {images.length > 1 && (
          <>
            <button
              className="portfolio-gallery-control portfolio-gallery-prev"
              onClick={() => move(-1)}
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="portfolio-gallery-control portfolio-gallery-next"
              onClick={() => move(1)}
              aria-label="Next screenshot"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="portfolio-gallery-bar">
        <span aria-live="polite">
          {index + 1} / {images.length}
        </span>
        {images.length > 1 && (
          <div className="portfolio-gallery-dots">
            {images.map((_, n) => (
              <button
                key={n}
                onClick={() => setIndex(n)}
                aria-label={`Show screenshot ${n + 1}`}
                aria-pressed={index === n}
              />
            ))}
          </div>
        )}
        <span>Click to expand</span>
      </div>
      <dialog
        ref={dialog}
        className="portfolio-lightbox"
        aria-label={`${title} screenshots`}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="portfolio-lightbox-content">
          <button
            autoFocus
            className="portfolio-gallery-control portfolio-gallery-close"
            onClick={close}
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>
          <div className="portfolio-lightbox-image">
            <PortfolioImage
              key={images[index]}
              src={images[index]}
              alt={`${title} - screenshot ${index + 1}`}
              contain
              original
              sizes="96vw"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                className="portfolio-gallery-control portfolio-gallery-prev"
                onClick={() => move(-1)}
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="portfolio-gallery-control portfolio-gallery-next"
                onClick={() => move(1)}
                aria-label="Next screenshot"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <span className="portfolio-lightbox-counter" aria-live="polite">
            {index + 1} / {images.length}
          </span>
        </div>
      </dialog>
    </div>
  );
}
