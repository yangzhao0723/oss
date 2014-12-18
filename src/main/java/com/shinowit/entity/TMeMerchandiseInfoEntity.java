package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfoEntity {
    private Integer id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
    private Collection<TMeInStockDetailsInfoEntity> meInStockDetailsInfosByMerchandiseId;
    private TMeMerchandiseCInfoEntity meMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfoEntity meProStatusInfoByProStatusId;
    private TMeUnitInfoEntity meUnitInfoByUnitId;
    private Collection<TMeOrderDetailsInfoEntity> meOrderDetailsInfosByMerchandiseId;
    private Collection<TMeOutStockDetailsInfoEntity> meOutStockDetailsInfosByMerchandiseId;
    private Collection<TMeStockInfoEntity> meStockInfosByMerchandiseId;

    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeMerchandiseInfoEntity that = (TMeMerchandiseInfoEntity) o;

        if (id != that.id) return false;
        if (saleStatus != that.saleStatus) return false;
        if (clickCount != null ? !clickCount.equals(that.clickCount) : that.clickCount != null) return false;
        if (describe != null ? !describe.equals(that.describe) : that.describe != null) return false;
        if (merchandiseAb != null ? !merchandiseAb.equals(that.merchandiseAb) : that.merchandiseAb != null)
            return false;
        if (merchandiseId != null ? !merchandiseId.equals(that.merchandiseId) : that.merchandiseId != null)
            return false;
        if (merchandiseName != null ? !merchandiseName.equals(that.merchandiseName) : that.merchandiseName != null)
            return false;
        if (picPath != null ? !picPath.equals(that.picPath) : that.picPath != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (spec != null ? !spec.equals(that.spec) : that.spec != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (merchandiseId != null ? merchandiseId.hashCode() : 0);
        result = 31 * result + (merchandiseName != null ? merchandiseName.hashCode() : 0);
        result = 31 * result + (merchandiseAb != null ? merchandiseAb.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (saleStatus ? 1 : 0);
        result = 31 * result + (spec != null ? spec.hashCode() : 0);
        result = 31 * result + (describe != null ? describe.hashCode() : 0);
        result = 31 * result + (picPath != null ? picPath.hashCode() : 0);
        result = 31 * result + (clickCount != null ? clickCount.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }



    @OneToMany(mappedBy = "meMerchandiseInfoByMerchandiseId")
    public Collection<TMeInStockDetailsInfoEntity> getMeInStockDetailsInfosByMerchandiseId() {
        return meInStockDetailsInfosByMerchandiseId;
    }

    public void setMeInStockDetailsInfosByMerchandiseId(Collection<TMeInStockDetailsInfoEntity> meInStockDetailsInfosByMerchandiseId) {
        this.meInStockDetailsInfosByMerchandiseId = meInStockDetailsInfosByMerchandiseId;
    }


    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfoEntity getMeMerchandiseCInfoByMerchandiseCid() {
        return meMerchandiseCInfoByMerchandiseCid;
    }

    public void setMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfoEntity meMerchandiseCInfoByMerchandiseCid) {
        this.meMerchandiseCInfoByMerchandiseCid = meMerchandiseCInfoByMerchandiseCid;
    }



    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfoEntity getMeProStatusInfoByProStatusId() {
        return meProStatusInfoByProStatusId;
    }

    public void setMeProStatusInfoByProStatusId(TMeProStatusInfoEntity meProStatusInfoByProStatusId) {
        this.meProStatusInfoByProStatusId = meProStatusInfoByProStatusId;
    }



    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfoEntity getMeUnitInfoByUnitId() {
        return meUnitInfoByUnitId;
    }

    public void setMeUnitInfoByUnitId(TMeUnitInfoEntity meUnitInfoByUnitId) {
        this.meUnitInfoByUnitId = meUnitInfoByUnitId;
    }




    @OneToMany(mappedBy = "meMerchandiseInfoByMerchandiseId")
    public Collection<TMeOrderDetailsInfoEntity> getMeOrderDetailsInfosByMerchandiseId() {
        return meOrderDetailsInfosByMerchandiseId;
    }

    public void setMeOrderDetailsInfosByMerchandiseId(Collection<TMeOrderDetailsInfoEntity> meOrderDetailsInfosByMerchandiseId) {
        this.meOrderDetailsInfosByMerchandiseId = meOrderDetailsInfosByMerchandiseId;
    }



    @OneToMany(mappedBy = "meMerchandiseInfoByMerchandiseId")

    public Collection<TMeOutStockDetailsInfoEntity> getMeOutStockDetailsInfosByMerchandiseId() {
        return meOutStockDetailsInfosByMerchandiseId;
    }

    public void setMeOutStockDetailsInfosByMerchandiseId(Collection<TMeOutStockDetailsInfoEntity> meOutStockDetailsInfosByMerchandiseId) {
        this.meOutStockDetailsInfosByMerchandiseId = meOutStockDetailsInfosByMerchandiseId;
    }

    @OneToMany(mappedBy = "meMerchandiseInfoByMerchandiseId")

    public Collection<TMeStockInfoEntity> getMeStockInfosByMerchandiseId() {
        return meStockInfosByMerchandiseId;
    }

    public void setMeStockInfosByMerchandiseId(Collection<TMeStockInfoEntity> meStockInfosByMerchandiseId) {
        this.meStockInfosByMerchandiseId = meStockInfosByMerchandiseId;
    }
}
