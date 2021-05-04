subject: Bestätige deine neue Mail
body:
<tr>
  <td>
    <h2 style="color:#1c262d">Hallo, {{ .name }}!</h2>
    <p style="color:#1c262d">Du hast beantragt deine Mail von {{ .oldEmail }} zu {{ .newEmail }} zu ändern.</p>
    <p style="color:#1c262d">Klicke auf den folgenden Link, um diese Änderung zu bestätigen.</p>
    <p>{{ .link }}</p>
    <p style="color:#666;font-size:14px">Hinweis: Dieser Link kann nur einmal verwendet werden und läuft nach 24 Stunden ab.</p>
  </td>
</tr>