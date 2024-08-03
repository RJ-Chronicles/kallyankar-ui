interface Props {
  heading: string;
  subHeading: string;
}
const Nothing: React.FC<Props> = ({ heading, subHeading }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-600">{heading}</h2>
      <p className="text-gray-500">{subHeading}</p>
    </div>
  );
};

export default Nothing;
