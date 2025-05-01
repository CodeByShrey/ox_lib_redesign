import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Slider, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import MarkdownComponents from '../../../config/MarkdownComponents';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '18%',
    right: '15%',
    width: 330,
    height: 530,
    padding: '10px 5px',
    background: 'rgba(6, 21, 43, 0.5)',
    boxShadow: 'inset 0px 0px 50px 0px rgba(3, 13, 25, 0.2)',
    border: '1px solid rgba(5, 20, 39, 0.5)',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginBottom: 0,
    gap: 6,
  },
  titleContainer: {
    width: '100%',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 23,
    textTransform: 'uppercase',
    padding: '2px 10px',
    textShadow: '0px 0px 10px  #000000',
  },
  buttonsContainer: {
    height: 470,
    padding: '4px 10px 10px 10px',
    overflowY: 'scroll',
  },
  buttonsFlexWrapper: {
    gap: 4,
  },

  fadein: {
    opacity: 0,
    transform: 'translateY(-20px)' /* Slight upward movement */,
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  },

  fadeinshow: {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setContextMenu(data);
    setVisible(true);
  });

  return (
    <>
      {visible && contextMenu && (
        // <ScaleFade visible={visible}>
        <Box className={classes.container}>
          <Flex className={classes.header}>
            {contextMenu.menu && (
              <HeaderButton icon="chevron-left" iconSize={16} handleClick={() => openMenu(contextMenu.menu)} />
            )}
            <Box className={classes.titleContainer}>
              <Text className={classes.titleText}>
                <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
              </Text>
            </Box>
            <HeaderButton icon="xmark" canClose={contextMenu.canClose} iconSize={18} handleClick={closeContext} />
          </Flex>
          <Box className={classes.buttonsContainer}>
            <Stack className={classes.buttonsFlexWrapper}>
              {Object.entries(contextMenu.options).map((option, index) => (
                <ContextButton option={option} key={`context-item-${index}`} />
              ))}
            </Stack>
          </Box>
        </Box>
        // </ScaleFade>
      )}
    </>
  );
};

export default ContextMenu;
