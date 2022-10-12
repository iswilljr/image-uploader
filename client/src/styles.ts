import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  title: {
    fontSize: theme.fontSizes.xl,
  },
  text: {
    fontSize: theme.fontSizes.md,
    fontWeight: 400,
    margin: `${theme.spacing.md}px 0`,
  },
  other: {
    color: theme.colors.gray?.[6],
  },
  disabled: {
    backgroundColor: theme.colors.gray[0],
    borderColor: theme.colors.gray[2],
    cursor: "not-allowed",
    "& *": {
      color: theme.colors.gray[5],
    },
  },
  uploading: {
    marginTop: theme.spacing.md,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
  },
}));

export const useResultStyles = createStyles((theme) => ({
  control: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  image: {
    borderRadius: theme.radius.md,
    height: "auto",
    objectFit: "cover",
    maxWidth: "100%",
  },
  icon: {
    borderRadius: theme.radius.xl,
    display: "grid",
    placeItems: "center",
    width: 45,
    color: theme.white,
    height: 45,
  },
  check: {
    backgroundColor: theme.colors.green[8],
  },
  error: {
    backgroundColor: theme.colors.red[8],
  },
  loading: {
    animation: "loader 1.5s linear infinite",
  },
  copyUrlWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.md,
    border: `1px ${theme.colors.gray[5]} solid`,
    padding: 1,
    paddingLeft: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.gray[4],
    [theme.fn.smallerThan("xs")]: {
      display: "block",
      maxWidth: "50vw",
      padding: theme.spacing.xs,
    },
  },
  button: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      marginTop: theme.spacing.xs,
    },
  },
  url: {
    whiteSpace: "nowrap",
    flex: 1,
    textAlign: "left",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
}));
