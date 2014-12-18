package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TBa_SupplyRecordInfo")
public class TBaSupplyRecordInfoEntity {
    private int id;
    private String payAccountNo;
    private String payBank;
    private String recAccountNo;
    private String recBank;
    private String remark;
    private BigDecimal totalMoney;
    private Timestamp supplyTime;
    private TBaMemberInfoEntity baMemberInfoByUserName;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "PayAccountNo")
    public String getPayAccountNo() {
        return payAccountNo;
    }

    public void setPayAccountNo(String payAccountNo) {
        this.payAccountNo = payAccountNo;
    }

    @Basic
    @Column(name = "PayBank")
    public String getPayBank() {
        return payBank;
    }

    public void setPayBank(String payBank) {
        this.payBank = payBank;
    }

    @Basic
    @Column(name = "RecAccountNo")
    public String getRecAccountNo() {
        return recAccountNo;
    }

    public void setRecAccountNo(String recAccountNo) {
        this.recAccountNo = recAccountNo;
    }

    @Basic
    @Column(name = "RecBank")
    public String getRecBank() {
        return recBank;
    }

    public void setRecBank(String recBank) {
        this.recBank = recBank;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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
    @Column(name = "SupplyTime")
    public Timestamp getSupplyTime() {
        return supplyTime;
    }

    public void setSupplyTime(Timestamp supplyTime) {
        this.supplyTime = supplyTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaSupplyRecordInfoEntity that = (TBaSupplyRecordInfoEntity) o;

        if (id != that.id) return false;
        if (payAccountNo != null ? !payAccountNo.equals(that.payAccountNo) : that.payAccountNo != null) return false;
        if (payBank != null ? !payBank.equals(that.payBank) : that.payBank != null) return false;
        if (recAccountNo != null ? !recAccountNo.equals(that.recAccountNo) : that.recAccountNo != null) return false;
        if (recBank != null ? !recBank.equals(that.recBank) : that.recBank != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (supplyTime != null ? !supplyTime.equals(that.supplyTime) : that.supplyTime != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (payAccountNo != null ? payAccountNo.hashCode() : 0);
        result = 31 * result + (payBank != null ? payBank.hashCode() : 0);
        result = 31 * result + (recAccountNo != null ? recAccountNo.hashCode() : 0);
        result = 31 * result + (recBank != null ? recBank.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (supplyTime != null ? supplyTime.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")

    public TBaMemberInfoEntity getBaMemberInfoByUserName() {
        return baMemberInfoByUserName;
    }

    public void setBaMemberInfoByUserName(TBaMemberInfoEntity baMemberInfoByUserName) {
        this.baMemberInfoByUserName = baMemberInfoByUserName;
    }
}
