import React from 'react'

function Download() {
  return (
    <div>
        <div className={styles.copyLink}>
              <div className={styles.copyLink .Link}>
                <p>File Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
              </div>
              <button onClick={() => navigator.clipboard.writeText(link)}>
                <img src="/images/copy-two-paper-sheets-interface-symbol_54702.png" alt="copy" />
              </button>
            </div>
    </div>
  )
}

export default Download