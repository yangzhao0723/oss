package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfoEntity {
    private int id;
    private String outBillCode;
    private Timestamp outTime;
    private String handler1;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderInfoEntity> meOrderInfosByOutBillCode;
    private Collection<TMeOutStockDetailsInfoEntity> meOutStockDetailsInfosByOutBillCode;
    private TAuOperInfoEntity auOperInfoByOperId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "OutBillCode")
    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }

    @Basic
    @Column(name = "OutTime")
    public Timestamp getOutTime() {
        return outTime;
    }

    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandler1() {
        return handler1;
    }

    public void setHandler1(String handler1) {
        this.handler1 = handler1;
    }

    @Basic
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
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

        TMeOutStockInfoEntity that = (TMeOutStockInfoEntity) o;

        if (id != that.id) return false;
        if (handler1 != null ? !handler1.equals(that.handler1) : that.handler1 != null) return false;
        if (outBillCode != null ? !outBillCode.equals(that.outBillCode) : that.outBillCode != null) return false;
        if (outTime != null ? !outTime.equals(that.outTime) : that.outTime != null) return false;
        if (outType != null ? !outType.equals(that.outType) : that.outType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (outBillCode != null ? outBillCode.hashCode() : 0);
        result = 31 * result + (outTime != null ? outTime.hashCode() : 0);
        result = 31 * result + (handler1!= null ? handler1.hashCode() : 0);
        result = 31 * result + (outType != null ? outType.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }



    @OneToMany(mappedBy = "meOutStockInfoByOutBillCode")
    public Collection<TMeOrderInfoEntity> getMeOrderInfosByOutBillCode() {
        return meOrderInfosByOutBillCode;
    }

    public void setMeOrderInfosByOutBillCode(Collection<TMeOrderInfoEntity> meOrderInfosByOutBillCode) {
        this.meOrderInfosByOutBillCode = meOrderInfosByOutBillCode;
    }



    @OneToMany(mappedBy = "meOutStockInfoByOutBillCode")
    public Collection<TMeOutStockDetailsInfoEntity> getMeOutStockDetailsInfosByOutBillCode() {
        return meOutStockDetailsInfosByOutBillCode;
    }

    public void setMeOutStockDetailsInfosByOutBillCode(Collection<TMeOutStockDetailsInfoEntity> meOutStockDetailsInfosByOutBillCode) {
        this.meOutStockDetailsInfosByOutBillCode = meOutStockDetailsInfosByOutBillCode;
    }
    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")

    public TAuOperInfoEntity getAuOperInfoByOperId() {
        return auOperInfoByOperId;
    }

    public void setAuOperInfoByOperId(TAuOperInfoEntity auOperInfoByOperId) {
        this.auOperInfoByOperId = auOperInfoByOperId;
    }
}
