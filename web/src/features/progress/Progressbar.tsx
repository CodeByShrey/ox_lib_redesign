import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({

  container: {
    width: 380,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    overflow: 'hidden',
    border: 'none',
    borderRadius: 10,
    boxShadow: '0px 0px 50px 5px #0a0d21',
  
  },
  
  progressContainer:{
    background:'radial-gradient(50% 50% at 50% 50%, rgba(43, 57, 98, .4) 0, rgba(36, 39, 63, .7) 100%)', 
    height:'20px', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
    border:'1px solid rgba(0, 0, 0, 0.15)',
    
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',

  },
  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, #4e65a7 -1.57%,rgb(86, 192, 253) 102.99%)',
    borderRadius: 10,
    
  },
  labelWrapper: {
    width: 400,
    height: 30,
    marginTop: '20px',
    display: 'flex',
    alignItems:'center',
    justifyContent:'space-between',
  },
  label: {
    overflow: 'hidden',
    fontSize: 16,
    color: '#fff',
    textShadow: '0px 0px 20px #000000',
    textTransform:'uppercase',
  },
  value:{
    color:'#ffffff',
    fontSize: 16,
  }
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [value, setValue] = React.useState(0);  

  useNuiEvent('progressCancel', () => {
    setValue(99);
    setVisible(false);
  });

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    if (visible) return;
    setVisible(true);
    setValue(0);
    setLabel(data.label || '');
    setDuration(data.duration);
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((previousValue) => {
        const newValue = previousValue + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue;
      });
    }, onePercent);
  });

  return (
    <>
      <Box className={classes.wrapper} >
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.labelWrapper}>
                <Text className={classes.label}>{label}</Text>
                <Text className={classes.value}>{value}%</Text>
          </Box>
          <Box className={classes.progressContainer}>
            <Box className={classes.container}>
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              ></Box>              
            </Box>
          </Box>

        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
