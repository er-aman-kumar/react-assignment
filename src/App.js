
import { useState } from 'react';
import './App.css';
import ImageList from './components/ImageList';
import ComparisonTable from './components/ComparisonTable';

function App() {
  const [images, setImages] = useState([])

  return (
    <>
      <ImageList images={images} setImages={setImages} />
      {images.length > 0 &&
        <div className='height-45'>
          <div className='container'>
            <ComparisonTable images={images} />
          </div>
        </div>
      }
    </>
  );
}

export default App;
