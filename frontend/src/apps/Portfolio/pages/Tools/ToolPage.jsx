import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Lazy load individual tools
const JsonFormatter = React.lazy(() => import('./tools/JsonFormatter'));
const Base64Tool = React.lazy(() => import('./tools/Base64Tool'));
const PasswordGenerator = React.lazy(() => import('./tools/PasswordGenerator'));
const LoremIpsumGenerator = React.lazy(() => import('./tools/LoremIpsumGenerator'));
const ColorPaletteGenerator = React.lazy(() => import('./tools/ColorPaletteGenerator'));

// Tool mapping
const toolComponents = {
  'json-formatter': JsonFormatter,
  'base64-encoder-decoder': Base64Tool,
  'password-generator': PasswordGenerator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'color-palette-generator': ColorPaletteGenerator
};

const ToolPage = () => {
  const { toolSlug } = useParams();

  const ToolComponent = toolComponents[toolSlug];

  if (!ToolComponent) {
    return <Navigate to="/tools" replace />;
  }

  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ToolComponent />
    </React.Suspense>
  );
};

export default ToolPage;
