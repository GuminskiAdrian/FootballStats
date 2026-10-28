import styles from "./ClubShortNames.module.css";

interface ClubShortNamesProps {
  full: string;
  short: string;
}

export default function ClubShortNames({ full, short }: ClubShortNamesProps) {
  return (
    <>
      <span className={styles.full}>{full}</span>
      <abbr title={full} className={styles.short}>
        {short}
      </abbr>
    </>
  );
}
