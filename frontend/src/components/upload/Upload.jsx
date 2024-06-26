import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './Upload.module.css';
import Loader from '../loader/Loader'
import Email from '../email/Email';

function Upload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
      setId(response.data.id);
      let downloadUrl = `http://localhost:8000/Vdownload/${response.data.id}`;
      setLink(downloadUrl);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }

    setLoading(false);

  };

  const cleanUp = () => {
    setLink("");
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>

      <div className={styles.outer}>
        <div
          className={`${styles.dragAndDropArea} ${dragActive ? styles.active : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <img src="images/cloud-file_11677415.png" draggable="false" className={styles.cloudfileImg} alt="" />
          <input
            className={styles.fileInput}
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <p>Drag and drop a file here or click to <span className={styles.brouse}> select a file </span> </p>
          {dragActive && <p className={styles.dragText}>Drop file here...</p>}
        </div>


        <button onClick={handleUpload} disabled={!file} className={styles.selectbtn}>Upload</button>

        <div>

        </div>



        <div>
          {
            loading && (<Loader />)
          }
          {link && (

            <div>
              <div className={styles.copyLink}>
                <div className={styles.copyLink.Link}>
                  <p><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
                </div>
                <button onClick={() => navigator.clipboard.writeText(link)}>
                  <img src="/images/copy-two-paper-sheets-interface-symbol_54702.png" draggable="false" alt="copy" />
                </button>
              </div>

              <div className={styles.linee}></div>

              <Email id={id} cleanUp={cleanUp} />

            </div>




          )}
        </div>
      </div>

      {/* <div className={styles.rightImg}>
        <img src="/images/2918327.jpg" alt="" />
      </div> */}




    </div>
  );
}

export default Upload;
