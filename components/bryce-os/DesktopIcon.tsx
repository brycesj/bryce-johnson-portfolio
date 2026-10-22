type DesktopIconProps = {
  id: string;
  label: string;
  kind: "document" | "folder" | "work" | "person" | "map" | "links" | "disk" | "trash";
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

export function DesktopIcon({ id, label, kind, selected, onSelect, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? "is-selected" : ""}`}
      aria-label={`Open ${label}`}
      onClick={(event) => {
        onSelect();
        if (window.innerWidth <= 720 || event.detail === 0) onOpen();
      }}
      onDoubleClick={onOpen}
      onTouchEnd={(event) => {
        event.preventDefault();
        onOpen();
      }}
      data-app={id}
    >
      <span className={`pixel-icon pixel-icon--${kind}`} aria-hidden="true">
        <span />
      </span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
