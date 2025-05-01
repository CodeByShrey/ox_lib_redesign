import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    background:'rgba(6, 21, 43, 0.5)',
    boxShadow: 'inset 0px 0px 50px 0px rgb(3, 13, 25)',
    height: 60,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  heading: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 500,
    fontFamily: 'Oswald',
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
