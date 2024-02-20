import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { AudioLines, Download, Disc3 } from 'lucide-react'

const App = () => {

  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [dataFile, setDataFile] = useState<Blob | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const link = inputRef.current?.value;
    setDataFile(undefined);
    setIsWaiting(true);

    axios.post('http://127.0.0.1:8000/downloader/extract-audio', {
      "video_url": link
    }).then(res => {
      console.log(res.headers);
      const blob = new Blob([res.data], { type: 'audio/mp3' });
      setDataFile(blob);
      setIsWaiting(false);
    })
      .catch(err => console.log(err));
  }

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(dataFile);
    link.download = 'audio.mp3';
    link.click();
    //liberar el objeto url
  }

  return (
    <>
      <header className='w-full flex flex-row justify-center items-center mt-5'>
        <h1 className='text-center text-6xl font-concert '>Your<span className='font-protest text-[#7630D9]'>Sound</span> </h1>
        <AudioLines className='w-14 h-14' />
      </header>
      <main className='mt-8 flex flex-col w-full items-center'>

        <form className='mb-6' onSubmit={handleSubmit}>
          <div className='w-full flex flex-row justify-center items-center'>
            <input className='w-96 rounded-md pl-4 py-2 text-blue-700 placeholder:font-concert placeholder:pb-2 bg-[#EAEAEA]' 
              type="url"
              placeholder="Pega el link acá" required ref={inputRef}
            />
            <button className={`px-4 pb-2 ml-5 rounded-md font-concert text-lg hover:bg-[#93F205]/80 
              ${isWaiting ? 'bg-[#558C03] cursor-not-allowed' : 'bg-[#93F205]'}`}
              disabled={isWaiting}
              type='submit'>
              Enviar
            </button>
          </div>
        </form>

        <section>
          {dataFile && (
            <button className='px-4 py-2 rounded-md bg-[#93F205] hover:bg-[#93F205]/80 font-concert text-xl' onClick={downloadFile}>
              Descargar .mp3
              <Download className='m-auto animate-bounce mt-2' />
            </button>
          )}

          {isWaiting && (
            <Disc3 className='animate-spin w-8 h-8' />
          )}
        </section>
      </main>
    </>
  )
}

export default App
