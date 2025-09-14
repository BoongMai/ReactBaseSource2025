import { Image, Spin } from 'antd';
import React, { memo, useCallback, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: React.ReactNode;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({
    src,
    alt,
    width,
    height,
    className,
    style,
    placeholder,
    fallback = '/icons/icon-192x192.png',
    loading = 'lazy',
    quality = 80,
    sizes,
    onLoad,
    onError,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(() => {
      setIsLoading(false);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    }, [onError]);

    const imageStyle = {
      width,
      height,
      objectFit: 'cover' as const,
      ...style,
    };

    if (isLoading && !placeholder) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...imageStyle,
          }}
          className={className}
        >
          <Spin />
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', width, height }}>
        {isLoading && placeholder && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {placeholder}
          </div>
        )}
        <Image
          src={hasError ? fallback : src}
          alt={alt}
          style={imageStyle}
          className={className}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          preview={false}
          placeholder={placeholder ? undefined : <Spin />}
          fallback={fallback}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
