interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function Modal({ isOpen, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black"></div>
      <div className="relative bg-white rounded-2xl w-[600px] transform transition-all shadow-2xl">
        <div className="bg-red-600 rounded-2xl p-2">
          <div className="bg-white rounded-xl p-10">
            <div className="text-center">
              <h3 className="press-start text-3xl mb-8 text-red-600">⚠️ WARNING</h3>
              <p className="text-gray-800 mb-10 text-xl leading-relaxed font-bold max-w-lg mx-auto">
                This page contains flashing lights and colors that may trigger seizures in people with photosensitive epilepsy.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onConfirm}
                  className="press-start px-16 py-6 bg-black text-white rounded-xl 
                           hover:bg-gray-800 transition-colors text-xl
                           hover:scale-105 transform duration-200
                           shadow-lg hover:shadow-xl"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}