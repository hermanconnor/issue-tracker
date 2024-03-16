const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div>Issue Summary</div>
        <div>Issue Chart</div>
      </div>

      <div>Latest Issues</div>
    </div>
  );
};

export default DashboardPage;
