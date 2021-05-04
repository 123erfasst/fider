subject: [{{ .tenantName }}] {{ .title }}
body:
<tr>
  <td>
    <p style="padding-bottom:10px;border-bottom:1px solid #efefef;color:#1c262d">
      <strong>{{ .userName }}</strong> hat einen neuen Beitrag erstellt <strong>{{ .title }} ({{ .postLink }})</strong>.
    </p>
    {{ .content }}
    <p style="color:#666;font-size:14px">
      — <br />
      Du erhälst diese Mail, weil du die Seite abboniert hast. Du kannst ihn {{ .view }} oder {{ .change }}.
    </p>
  </td>
</tr>