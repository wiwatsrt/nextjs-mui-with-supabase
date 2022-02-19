import { createTheme } from '@mui/material/styles'

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#667EEA',
    },
    error: {
      main: '#E53E3E',
    },
    grey: {
      50: '#f9fafb',
      100: '#f4f5f7',
      200: '#e5e7eb',
      300: '#d2d6dc',
      400: '#9fa6b2',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#252f3f',
      900: '#171e2e',
    },
  },
  shape: {
    borderRadius: 5,
  },
  spacing: 10,
  typography: {
    fontFamily: '"Nunito", "Noto Sans Thai", sans-serif',
  },
})

theme = createTheme({
  ...theme,
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.1)',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'normal',
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
    // Text Field
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey['300'],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
        },
        input: {
          padding: theme.spacing(1, 1.5),
        },
        multiline: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-shrink': {
            transform: 'translate(15px, -10px) scale(0.75)',
          },
        },
        outlined: {
          transform: 'translate(15px, 10px) scale(1)',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
            padding: 0,
          },
          '& .MuiOutlinedInput-root': {
            padding: theme.spacing(1, 1.5),
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            color: theme.palette.grey['500'],
            letterSpacing: 1,
            backgroundColor: theme.palette.grey['50'],
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected-hover:hover': {
            backgroundColor: theme.palette.primary['light'],
          },
          '&.MuiTableRow-hover:hover:not(.Mui-selected)': {
            backgroundColor: theme.palette.grey['50'],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: theme.palette.grey['500'],
          borderColor: theme.palette.grey[200],
        },
      },
    },
  },
})

export default theme
