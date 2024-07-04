import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return <div className="text-cyan-950 p-10 font-sans font-bold text-lg">Content UI</div>;
}
