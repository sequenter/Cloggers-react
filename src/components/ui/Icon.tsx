interface Props {
  className?: string;
  path: string;
  title: string;
}

/**
 * A simple SVG icon.
 * @param {object} props Props object
 * @param {string} props.className Styling
 * @param {string} props.path SVG path
 * @param {string} props.title SVG title
 * @returns JSX element
 */
const Icon = ({ className, path, title }: Props) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path d={path}></path>
    </svg>
  );
};

export default Icon;
