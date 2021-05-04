subject: [{{ .tenantName }}] {{ .title }}
body:
<tr>
  <td>
    <p style="padding-bottom:10px;border-bottom:1px solid #efefef;color:#1c262d">
      {{ if .duplicate }}
        <strong>{{ .title }} ({{ .postLink }})</strong> wurde geschlossen als <strong>{{ .status }}</strong> von {{ .duplicate }}.
      {{ else }}
        Der Status von <strong>{{ .title }} ({{ .postLink }})</strong> wurde zu <strong>{{ .status }}</strong> geändert.
      {{ end }}
    </p>
    {{ .content }}
    <p style="color:#666;font-size:14px">
      — <br />
      Du erhälst diese Mail, weil du die Seite abboniert hast. Du kannst ihn {{ .view }}, {{ .unsubscribe }} oder {{ .change }}.
    </p>
  </td>
</tr>