import ConstructionImages from "./ConstructionImages";

const ConstructionInfo = ({
  formatBuildDate,
  formatLossDate,
  // imgPreview,
  constructionField,
  typeToString,
  statusToString,
  materialToString,
  styleToString,
}) => {
  return (
    <div className="form-info">
      {constructionField.images && (
        <ConstructionImages constructionField={constructionField} />
      )}
      {constructionField.type && (
        <p>
          <strong>{`Type:`}</strong> {typeToString(constructionField.type)}
        </p>
      )}
      {constructionField.status && (
        <p>
          <strong>{`Status:`}</strong>{" "}
          {statusToString(constructionField.status)}
        </p>
      )}
      {constructionField.buildDate && (
        <p>
          <strong>{`BuildDate: `}</strong> {formatBuildDate}
        </p>
      )}
      {constructionField.lossDate && (
        <p>
          <strong>{`LossDate: `}</strong> {formatLossDate}
        </p>
      )}
      {constructionField.lossCause && (
        <p>
          <strong>{`Loss cause: `}</strong> {constructionField.lossCause}
        </p>
      )}
      {constructionField.material && (
        <p>
          <strong>{`Material: `}</strong>{" "}
          {materialToString(constructionField.material)}
        </p>
      )}
      {constructionField.article && (
        <p>
          <strong>{`Article: `}</strong>{" "}
          <a href={constructionField.article} target="_blank" rel="noreferrer">
            link
          </a>
        </p>
      )}
      {constructionField.architecturalStyle && (
        <p>
          <strong>{`Architectural style: `}</strong>
          {styleToString(constructionField.architecturalStyle)}
        </p>
      )}
      {constructionField.latitude !== 0 && (
        <p>
          <strong>{`Location: `}</strong> {constructionField.latitude},{" "}
          {constructionField.longitude}
        </p>
      )}
      {constructionField.address && (
        <p>
          <strong>{`Address: `}</strong> {constructionField.address}
        </p>
      )}
      {constructionField.description && (
        <p>
          <strong>{`Description: `}</strong> {constructionField.description}
        </p>
      )}
    </div>
  );
};

export default ConstructionInfo;
