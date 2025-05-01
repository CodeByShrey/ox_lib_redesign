import { Button, createStyles } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: '5px 5px',
    marginRight: '-10px',
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: 'inset 0px 0px 30px 0px #ea0e0ec8',
    '&:hover': {
      backgroundColor: '#ea0e0ec8',
      transition: 'all 0.5s ease',
    },
  },
  icon: {
    color: 'white',
    fontSize: 22,
  },
  root: {
    border: 'none',
  },
  label: {
    color: params.canClose === false ? theme.colors.dark[2] : theme.colors.dark[0],
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <LibIcon icon={icon} fontSize={iconSize} fixedWidth className={classes.icon} />
    </Button>
  );
};

export default HeaderButton;
