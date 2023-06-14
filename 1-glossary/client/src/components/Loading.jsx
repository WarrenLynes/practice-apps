import React from 'react';

export default function Loading() {
  const [progress, setProgress] = React.useState(0);
  // const [intervl, setIntervl] = React.useState(null);

  React.useEffect(() => {
    let intervl;

    intervl = setInterval(() => {
      console.log(progress);
      setProgress((progress) => {
        if (progress === 100) {
          return 0;
        }
        return progress + 1;
      });
    }, 50);

    // setIntervl(temp);

    return () => {
      console.log(intervl);
      clearInterval(intervl)
    }
  }, []);

  const styles = {
    position: 'absolute',
    top: '2px',
    border: '5px solid #008eff',
    width: progress + 'px',
    left: progress + '%'
  };

  return <span className="loading-bar" style={styles}></span>
}