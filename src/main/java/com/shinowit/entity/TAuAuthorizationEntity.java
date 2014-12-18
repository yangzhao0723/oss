package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorizationEntity {
    private int id;
    private Boolean isEnabled;
    private TAuMenuInfoEntity auMenuInfoBymenuId;
    private TAuRoleInfoEntity auRoleInfoByRoleId;


    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuAuthorizationEntity that = (TAuAuthorizationEntity) o;

        if (id != that.id) return false;
        if (isEnabled != null ? !isEnabled.equals(that.isEnabled) : that.isEnabled != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (isEnabled != null ? isEnabled.hashCode() : 0);
        return result;
    }



    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfoEntity getAuMenuInfoBymenuId() {
        return auMenuInfoBymenuId;
    }

    public void setAuMenuInfoBymenuId(TAuMenuInfoEntity auMenuInfoBymenuId) {
        this.auMenuInfoBymenuId = auMenuInfoBymenuId;
    }


    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")

    public TAuRoleInfoEntity getAuRoleInfoByRoleId() {
        return auRoleInfoByRoleId;
    }

    public void setAuRoleInfoByRoleId(TAuRoleInfoEntity auRoleInfoByRoleId) {
        this.auRoleInfoByRoleId = auRoleInfoByRoleId;
    }
}
