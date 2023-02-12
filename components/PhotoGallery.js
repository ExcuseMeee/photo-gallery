import PhotoCard from "./PhotoCard";

const PhotoGallery = ({ photoDocuments, createToast }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row flex-wrap justify-evenly items-center`}
    >
      {photoDocuments.map((document) => {
        return <PhotoCard key={document.id} photoDocument={document} createToast={createToast} />;
      })}
    </div>
  );
};

export default PhotoGallery;
