import React from 'react';
import Header from './Header';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  fullWidth?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  fullWidth = false,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${fullWidth ? 'w-full' : 'max-w-7xl'}`}>
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default PageContainer;