import "./Files.css";

/**
 * @function Files return images from array
 * @param {Oblect} props
 * @param {Array} props.urlArr uploaded files
 * @returns
 */
function Files({ urlArr }) {
  return (
    <>
      {urlArr && (
        <div className="uploaded-files">
          {urlArr.map((url) => {
            return <img src={url} alt="img" />;
          })}
        </div>
      )}
    </>
  );
}

export default Files;
