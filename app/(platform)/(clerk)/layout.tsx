export const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <div className="flex items-center justify-center flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;
