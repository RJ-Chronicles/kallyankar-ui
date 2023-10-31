const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div className="bg-slate-600 text-slate-100  font-san font-bold py-4 rounded-sm text-center shadow-md text-2xl">
      {heading}
    </div>
  );
};

export default Heading;
