const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-widest text-blue-500 mb-5 pb-2.5 border-b-[1.5px] border-blue-100">
        {children}
    </p>
);

export default SectionTitle;