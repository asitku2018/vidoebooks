export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
        <p className="text-base text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Vidoebooks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
