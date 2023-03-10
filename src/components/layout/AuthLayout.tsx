/**
 * Komponenta reprezentuje layout pro přihlášenou část aplikace
 */

interface IAuth {

}

// TODO: doplňte potřebné props
export default function AuthLayout() {
  // TODO: implementujte layout pro přihlášenou část aplikace (stránky: overview, user list, user detail, create/edit user)
  /*
    TODO: vytvořený layout aplikujte tam, kde je třeba (viz stránky o řádek výše)
    layout by měl obsahovat:
    - side menu: boční menu s možností navigace na jednotlivé stránky v administrace (přehled, seznam uživatelů) + možnost odhlášení uživatele
    - content: hlavní část stránky do které se bude renderovat obsah jednotlivých stránek
    - někde by se také měla objevit informace o tom, jaký uživatel je aktuálně přihlášený (často je zobrazování pomocí jména + obrázku/iniciálů uživatele, 
      nebo jen obrázkem/iniciály a po kliknutí se zobrazí jméno + často možnost odhlášení)
      -> v auth contextu je k dispozici objekt `user`
  */
  // TODO: pro side menu vytvořte vlastní komponentu - menu by mělo uživateli ukazovat, kde se aktuálně nachází (která stránka je aktivní)
  return <></>;
}
