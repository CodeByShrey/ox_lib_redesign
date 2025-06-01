import { Box, Button, ColorPicker, createStyles, Group, HoverCard, Image, Progress, Stack, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { ContextMenuProps, Option } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';
import { isIconUrl } from '../../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MarkdownComponents from '../../../../config/MarkdownComponents';
import LibIcon from '../../../../components/LibIcon';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: false });
};

const clickContext = (id: string) => {
  fetchNui('clickContext', id);
};

const useStyles = createStyles((theme, params: { disabled?: boolean; readOnly?: boolean }) => ({
  inner: {
    justifyContent: 'flex-start',
  },
  label: {
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
  button: {
    height: 'fit-content',
    width: '100%',
    background: 'rgba(42, 59, 80, 0.5)',
    boxShadow: 'inset 0px 0px 20px 0px rgba(20, 28, 39, 0.7)',

    fontFamily: 'Oswald',
    fontSize: 16,
    border: '1px solid rgba(1, 5, 7, 0.4)',
    padding: 10,
    borderRadius: 0,
    '&:hover': {
      background: 'rgba(3, 11, 21, 0.8)',
      border: '1px solid rgba(7, 172, 255, 0.74)',
      borderRadius: '0px',
      boxShadow: '0 0 10px 2px rgba(10, 126, 204, 0.74)',
      opacity: '1',
      cursor: params.readOnly ? 'unset' : 'pointer',
    },
    '&:disabled': {
      background: '#050812',
      boxShadow: 'none',
      border: 'calc(0.092592592vh * 1.4) solid rgba(255, 255, 255, 0.15)',
      color: 'gray',
    },
    '&:active': {
      transform: params.readOnly ? 'unset' : undefined,
    },
  },
  iconImage: {
    maxWidth: '30px',
    filter: 'drop-shadow(0px 0px 3px rgba(7, 172, 255, 0.5))',
  },
  description: {
    color: params.disabled ? theme.colors.dark[3] : theme.colors.dark[2],
    fontSize: 12,
  },
  dropdown: {
    backgroundColor: 'rgba(3, 11, 21, 0.95)',
    fontSize: 14,
    maxWidth: 270,
    width: 'fit-content',
    border: 'none',
  },
  buttonStack: {
    gap: 10,
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonGroup: {
    gap: 4,
    flexWrap: 'nowrap',
  },
  buttonIconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitleText: {
    overflowWrap: 'break-word',
  },
  buttonArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  customtext: {
    // display: 'flex',
  },
  addOnContainer: {
    width: '100%',
  },
  progressContainer: {
    width: '100% !important',
    marginTop: 5,
    marginBottom: 5,
  },
}));

const ContextButton: React.FC<{
  option: [string, Option];
}> = ({ option }) => {
  const button = option[1];
  const buttonKey = option[0];
  const { classes } = useStyles({ disabled: button.disabled, readOnly: button.readOnly });

  return (
    <>
      <HoverCard
        position="right-start"
        disabled={button.disabled || !(button.metadata || button.image)}
        openDelay={200}
      >
        <HoverCard.Target>
          <Button
            classNames={{ inner: classes.inner, label: classes.label, root: classes.button }}
            onClick={() =>
              !button.disabled && !button.readOnly
                ? button.menu
                  ? openMenu(button.menu)
                  : clickContext(buttonKey)
                : null
            }
            variant="default"
            disabled={button.disabled}
          >
            <Group position="apart" w="100%" noWrap>
              <Stack className={classes.buttonStack}>
                {(button.title || Number.isNaN(+buttonKey)) && (
                  <Group className={classes.buttonGroup}>
                    {button?.icon && (
                      <Stack className={classes.buttonIconContainer}>
                        {typeof button.icon === 'string' && isIconUrl(button.icon) ? (
                          <img src={button.icon} className={classes.iconImage} alt="Missing img" />
                        ) : (
                          <LibIcon
                            icon={button.icon as IconProp}
                            fixedWidth
                            size="lg"
                            style={{ color: button.iconColor }}
                            animation={button.iconAnimation}
                          />
                        )}
                      </Stack>
                    )}
                    {/* <Text className={classes.buttonTitleText}>
                      <ReactMarkdown components={MarkdownComponents}>{button.title || buttonKey}</ReactMarkdown>
                    </Text> */}
                  </Group>
                )}
                <div className={classes.addOnContainer}>                  
                  <Box className={classes.customtext}>
                    <Text className={classes.buttonTitleText}>
                      <ReactMarkdown components={MarkdownComponents}>{button.title || buttonKey}</ReactMarkdown>
                    </Text>
                    {button.description && (
                      <Text className={classes.description}>
                        <ReactMarkdown components={MarkdownComponents}>{button.description}</ReactMarkdown>
                      </Text>
                    )}
                  </Box>
                  {typeof button.progress === 'number' && button.progress !== undefined && (
                    <div className={classes.progressContainer}>
                      <Progress
                        value={button.progress}
                        size="sm"
                        color={button.colorScheme ?? '#4886f0'}
                        className='progress-bar'                        
                      />
                    </div>
                )}
                </div>
              </Stack>
              {(button.menu || button.arrow) && button.arrow !== false && (
                <Stack className={classes.buttonArrowContainer}>
                  <LibIcon icon="chevron-right" fixedWidth />
                </Stack>
              )}
            </Group>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.dropdown}>
          {button.image && <Image src={button.image} />}
          {Array.isArray(button.metadata) ? (
            button.metadata.map(
              (
                metadata: string | { label: string; value?: any; progress?: number; colorScheme?: string },
                index: number
              ) => (
                <>
                  <Text key={`context-metadata-${index}`}>
                    {typeof metadata === 'string' ? `${metadata}` : `${metadata.label}: ${metadata?.value ?? ''}`}
                  </Text>

                  {typeof metadata === 'object' && metadata.progress !== undefined && (
                    <Progress
                      value={metadata.progress}
                      size="sm"
                      color={metadata.colorScheme || 'white' || 'dark.3'}
                    />
                  )}
                </>
              )
            )
          ) : (
            <>
              {typeof button.metadata === 'object' &&
                Object.entries(button.metadata).map((metadata: { [key: string]: any }, index) => (
                  <Text key={`context-metadata-${index}`}>
                    {metadata[0]}: {metadata[1]}
                  </Text>
                ))}
            </>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default ContextButton;
