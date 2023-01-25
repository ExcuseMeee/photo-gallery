import Photo from "./Photo";

const PhotoGallery = ({ photoDocuments }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row flex-wrap justify-evenly items-center`}
    >
      {photoDocuments.map((document) => {
        return (
          <Photo
            key={document.id}
            imageUrl={document.imageUrl}
            title={document.title}
            postedBy={document.postedBy}
          />
        );
      })}
    </div>
  );
};

export default PhotoGallery;
