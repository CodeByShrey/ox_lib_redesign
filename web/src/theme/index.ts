import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Oswald',
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  components: {
    Modal: {
      styles: {
        modal: {
          background: 'rgba(6, 21, 43, 0.5)',
          borderRadius: '0px',
          border:'1px solid rgb(3, 13, 25)',
          boxShadow: 'inset 0px 0px 80px 0px rgb(3, 13, 25)',
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    TimeInput: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    Select: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    MultiSelect: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    NumberInput: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    Checkbox: {
      styles: {
        input: {
          color: 'white',
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
      },
    },

    PasswordInput: {
      styles: {
        input: {
          background:
            'radial-gradient(83.87% 1043.26% at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          border: 'solid 0.11rem rgb(81, 93, 106)',
        },
        icon: {
          backgroundColor: '#219cd2',
          border: 'solid 0.11rem rgb(81, 93, 106)',
          color: 'white',
        },
      },
    },
    Button: {
      styles: {
        root: {
          border: 'none',
        },
      },
    },
  },
};
