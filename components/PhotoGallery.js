import PhotoCard from "./PhotoCard";

const PhotoGallery = ({ photoDocuments }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row flex-wrap justify-evenly items-center`}
    >
      {photoDocuments.map((document) => {
        return (
          <PhotoCard
            key={document.id}
            id={document.id}
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
