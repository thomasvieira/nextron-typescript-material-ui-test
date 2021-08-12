import React from "react";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  Button,
  createStyles,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createTheme";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const styles = ({ palette, spacing, breakpoints, typography }: Theme) =>
  createStyles({
    avatar: {
      width: 60,
      height: 60,
    },
    name: {
      marginTop: spacing(1),
    },
    drawer: {
      width: 190,
      [breakpoints.up("lg")]: {
        marginTop: "5.3rem",
        height: "calc(100% - 5.3rem)",
      },
    },
    profileRoot: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "fit-content",
    },
    root: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: spacing(2),
    },
    divider: {
      margin: spacing(2, 0),
      alignSelf: "stretch",
      height: "1px",
    },
    nav: {
      marginBottom: spacing(2),
      alignItens: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      padding: spacing(1, 0),
    },
    item: {
      display: "flex",
      padding: 0,
    },
    button: {
      color: palette.secondary.main,
      padding: "10px 8px",
      justifyContent: "flex-start",
      textTransform: "none",
      letterSpacing: 0,
      width: "100%",
      fontWeight: typography.fontWeightMedium,
      "&:hover": {
        backgroundColor: palette.secondary.light,
        borderColor: palette.secondary.dark,
        boxShadow: "none",
        color: palette.secondary.contrastText,
      },
    },
    icon: {
      color: palette.secondary.dark,
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      marginRight: spacing(1),
    },
    active: {
      color: palette.primary.main,
      fontWeight: typography.fontWeightMedium,
      "& $icon": {
        color: palette.primary.main,
      },
    },
    footer: {
      marginTop: "auto",
    },
  });

function Sidebar(props: { classes: any }) {
  const { classes } = props;

  const user = {
    name: "Thomas E. Vieira",
    avatar: "https://avatars.githubusercontent.com/u/45882203?v=4",
    bio: "Desenvolvedor de Aplicações",
  };

  const menuItens = [
    {
      title: "Pontuação",
      href: "/home",
      icon: <EmojiEventsIcon className={classes.icon} />,
    },
    {
      title: "Configurações",
      href: "/home",
      icon: <SettingsIcon className={classes.icon} />,
    },
    {
      title: "Editar Perfil",
      href: "/home",
      icon: <AccountBoxIcon className={classes.icon} />,
    },
  ];
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      variant="permanent"
      open
    >
      <div className={classes.root}>
        <Avatar alt="Person" className={classes.avatar} src={user.avatar} />
        <Typography className={classes.name} variant="h6" color="secondary">
          {user.name}
        </Typography>
        <Typography variant="body1" color="secondary">
          {user.bio}
        </Typography>
        <Divider className={classes.divider} />
        <List className={classes.nav}>
          {menuItens.map((menuItem) => (
            <ListItem key={menuItem.title} className={classes.item}>
              <Link href={menuItem.href}>
                <Button className={classes.button}>
                  <div>{menuItem.icon}</div>
                  {menuItem.title}
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(Sidebar);
