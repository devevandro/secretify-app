type ItemDetailsPanelFormButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function ItemDetailsPanelFormButton(
  props: ItemDetailsPanelFormButtonProps
) {
  return (
    <>
      <div className="flex col pl-4 pr-4 py-5">
        <button
          type="button"
          disabled={props.disabled}
          className={`w-1/2 py-3 cursor-pointer rounded-lg font-medium flex items-center justify-center border-1 border-[#666666] transition-colors bg-transparent text-[#666666] opacity-42}`}
          onClick={props.onClick}
        >
          <span>CANCELAR</span>
        </button>
        <button
          type="submit"
          disabled={props.disabled}
          className={`w-1/2 py-3 ml-15 rounded-lg font-medium flex items-center justify-center transition-colors ${
            props.disabled
              ? "bg-[#1787c1] text-gray-100 cursor-not-allowed opacity-42"
              : "bg-gradient-to-bl from-[#58BFF5] to-[#0B5A85] hover:bg-[#2a8aee] text-white cursor-pointer"
          }`}
          onClick={props.onClick}
        >
          {props.disabled ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>ENVIANDO...</span>
            </div>
          ) : (
            <>
              <span>ATUALIZAR</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
