package com.estrat.service.licenseservice.bean;

import java.io.Serializable;

public class LicenseKey implements Serializable {
    private String publicKey;
    private String licenseSaltKey;
    private String dataString;

    public String getPublicKey() { return this.publicKey; }
    public void setPublicKey(String publicKey) { this.publicKey = publicKey; }
    public String getDataString() { return this.dataString; }
    public void setDataString(String dataString) { this.dataString = dataString; }
    public String getLicenseSaltKey() { return this.licenseSaltKey; }
    public void setLicenseSaltKey(String licenseSaltKey) { this.licenseSaltKey = licenseSaltKey; }
}
