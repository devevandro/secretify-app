import { useState } from "react";
import { ItemDetailsPanelFormInput } from "./components/item-details-panel-form-input";
import { ItemDetailsPanelFormButton } from "./components/item-details-panel-form-button";
import VerticalDivider from "renderer/components/vertical-divider";

type ItemDetailsPanelFormProps = {
  selectedItem: any | null;
  setEditMode: (item: any) => void;
};

export function ItemDetailsPanelForm(props: ItemDetailsPanelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative p-4">
        <ItemDetailsPanelFormInput
          type="text"
          placeholder="Usuário de acesso"
          disabled={isSubmitting}
          required={true}
          onChange={(value) => console.log(value)}
          value={props.selectedItem?.plaintext.name}
        />
        <ItemDetailsPanelFormInput
          type="password"
          placeholder="Senha de acesso"
          disabled={isSubmitting}
          required={true}
          onChange={(value) => console.log(value)}
          value={props.selectedItem?.plaintext.password}
        />
        <ItemDetailsPanelFormInput
          type="text"
          placeholder="URL"
          disabled={isSubmitting}
          required={true}
          onChange={(value) => console.log(value)}
          value={props.selectedItem?.plaintext.url}
        />
        <ItemDetailsPanelFormInput
          type="text"
          placeholder="Descrição"
          disabled={isSubmitting}
          onChange={(value) => console.log(value)}
          value={props.selectedItem?.plaintext.url}
        />
      </div>

      <VerticalDivider borderColor="border-[#292929]" sizeBorderBottom="2" />

      <ItemDetailsPanelFormButton
        disabled={isSubmitting}
        onClick={() => props.setEditMode(false)}
      />
    </form>
  );
}
