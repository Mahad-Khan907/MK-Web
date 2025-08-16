export default function Footer() {
  return (
    <footer className="bg-purple-600 text-black py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-[15px] font-semibold">
          © {new Date().getFullYear()} MK Web. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
