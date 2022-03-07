export default function EllipsisText({ style, children }) {
  // 2. Wrap ChakraProvider at the root of your app

  return (
    <div style={style} className="textOverflow">
      {children}
    </div>
  );
}
