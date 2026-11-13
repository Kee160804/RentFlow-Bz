'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  ShieldCheck,
  UserCheck,
  Bell,
  RotateCcw,
  Download,
  LayoutDashboard,
  FileCheck2,
  Building,
  Landmark,
  Wrench,
  Receipt,
  Wallet,
  CheckCircle2,
  ScanLine,
  AlertCircle,
  Banknote,
  PlusCircle,
  Zap,
  User,
  Droplets,
  PieChart,
  Clock,
  DoorOpen,
  Eye,
  Printer,
  Copy,
  Send,
  Home,
  CreditCard,
  UploadCloud,
  ImagePlus,
  FileBadge,
  Smartphone,
  X,
  CheckCheck,
  Info,
  AlertTriangle,
  XCircle
} from 'lucide-react';

/*******************************************************************************
 * RENTFLOW BZ — NEXT.JS (APP ROUTER) & CAPACITOR MOBILE-READY APPLICATION
 * Drop this file directly into `src/app/page.tsx` in a Next.js + Tailwind +
 * Lucide project, or wrap with Capacitor (`npx cap add android && npx cap sync`)
 * to compile an Android APK / iOS App Store binary from this exact codebase.
 *******************************************************************************/

const STORAGE_KEY = 'rentflow_bz_nextjs_v1';

function getInitialDemoData() {
  return {
    currentRole: 'landlord', // 'landlord' | 'tenant'
    activeLandlordTab: 'dashboard',
    activeTenantTab: 'overview',
    activeTenantId: 'ten_1',
    billingMonth: 'November 2026',

    landlord: {
      id: 'landlord_1',
      name: 'Marcus Usher',
      company: "King's Park & Belmopan Properties Ltd.",
      email: 'marcus.usher@rentflowbz.com',
      phone: '+501 614-8820',
      plan: 'Landlord Pro ($12 BZD/mo • Up to 8 Units)',
      bankInstructions: {
        belizeBank: 'Belize Bank Ltd — Acct # 104-882941-0 (Checking) — Name: Marcus Usher',
        atlanticBank: 'Atlantic Bank Ltd — Acct # 2100493821 — Name: Marcus Usher',
        heritageBank: 'Heritage Bank Ltd — Acct # 55019283 — Name: Marcus Usher',
        eKyash: 'E-Kyash Wallet: +501 614-8820 (Marcus Usher)',
        digiWallet: 'DigiWallet: +501 614-8820 (Marcus Usher)',
        notes:
          'Please include your Unit Name (e.g., Apt 2B) in the transfer reference and upload a screenshot immediately after sending.'
      }
    },

    properties: [
      {
        id: 'prop_1',
        name: "King's Park Residences",
        district: 'Belize District (Belize City)',
        address: '14 Princess Margaret Drive, King’s Park, Belize City',
        houseRules:
          '1. Rent is due on the 1st of each month (5-day grace period; $25 BZD late fee applies after the 5th).\n2. Quiet hours from 10:00 PM to 6:30 AM.\n3. No unauthorized structural alterations or subletting.\n4. Report any BWS plumbing leaks immediately to avoid water wastage.'
      },
      {
        id: 'prop_2',
        name: 'Garden City Plaza & Suites',
        district: 'Cayo District (Belmopan)',
        address: '28 Ring Road, Belmopan, Cayo',
        houseRules:
          '1. Rent due on the 1st of each month.\n2. Commercial booths must keep front walkways clear.\n3. BEL & BWS accounts billed according to unit lease terms.'
      }
    ],

    units: [
      {
        id: 'unit_1',
        propertyId: 'prop_1',
        unitLabel: 'Apt 2B (2-Bedroom)',
        roomType: '2-Bedroom Apartment',
        monthlyRent: 850,
        depositAmount: 850,
        utilityMode: 'landlord_billed',
        utilityNote: 'Shared BWS Water Sub-meter + Common Hallway Light Split',
        utilityAddonAmount: 45,
        utilityBillProof: 'BWS Master Bill #884920 — Apt 2B Sub-meter Share (1,450 gal)',
        dueDate: 'Nov 1, 2026',
        tenantId: 'ten_1',
        inviteCode: 'KP-2B89'
      },
      {
        id: 'unit_2',
        propertyId: 'prop_1',
        unitLabel: 'Studio 1A (Downstairs Flat)',
        roomType: '1-Bedroom Studio',
        monthlyRent: 550,
        depositAmount: 550,
        utilityMode: 'included',
        utilityNote: 'Water (BWS) & Light (BEL) Included in Rent (Internet by Tenant)',
        utilityAddonAmount: 0,
        utilityBillProof: '',
        dueDate: 'Nov 1, 2026',
        tenantId: 'ten_2',
        inviteCode: 'KP-1A42'
      },
      {
        id: 'unit_3',
        propertyId: 'prop_2',
        unitLabel: 'Commercial Booth 3',
        roomType: 'Commercial Space',
        monthlyRent: 1100,
        depositAmount: 1100,
        utilityMode: 'tenant_direct',
        utilityNote: 'Tenant Pays Own BEL & BWS Meters Directly',
        utilityAddonAmount: 0,
        utilityBillProof: '',
        dueDate: 'Nov 1, 2026',
        tenantId: 'ten_3',
        inviteCode: 'GC-0377'
      },
      {
        id: 'unit_4',
        propertyId: 'prop_1',
        unitLabel: 'Apt 3A (3-Bedroom Family)',
        roomType: '3-Bedroom Apartment',
        monthlyRent: 1200,
        depositAmount: 1200,
        utilityMode: 'landlord_billed',
        utilityNote: 'Monthly BWS Water Split Billed by Landlord',
        utilityAddonAmount: 60,
        utilityBillProof: 'BWS Master Bill #884920 — Apt 3A Family Share',
        dueDate: 'Nov 1, 2026',
        tenantId: null,
        inviteCode: 'KP-3A91'
      }
    ],

    tenants: [
      {
        id: 'ten_1',
        fullName: 'Kyan Avila',
        phone: '+501 622-4190',
        email: 'kyan.avila@example.bz',
        unitId: 'unit_1',
        leaseStart: '2026-03-01',
        leaseEnd: '2027-02-28',
        monthsPaidCount: 8
      },
      {
        id: 'ten_2',
        fullName: 'Keisha Leslie',
        phone: '+501 631-9044',
        email: 'keisha.leslie@example.bz',
        unitId: 'unit_2',
        leaseStart: '2026-05-01',
        leaseEnd: '2027-04-30',
        monthsPaidCount: 6
      },
      {
        id: 'ten_3',
        fullName: 'Devon Flowers',
        phone: '+501 605-7712',
        email: 'devon.flowers@example.bz',
        unitId: 'unit_3',
        leaseStart: '2026-01-01',
        leaseEnd: '2026-12-31',
        monthsPaidCount: 10
      }
    ],

    payments: [
      {
        id: 'pay_101',
        receiptNumber: 'RFBZ-2026-0891',
        tenantId: 'ten_1',
        unitId: 'unit_1',
        billingMonth: 'November 2026',
        amount: 450,
        method: 'Belize Bank Transfer',
        referenceNo: 'BBL-99482104',
        submittedAt: '2026-11-02 09:15 AM',
        confirmedAt: '2026-11-02 10:02 AM',
        status: 'confirmed',
        rejectionReason: '',
        customImageDataUrl: null,
        receiptLabel: 'Belize Bank Online Transfer Confirmation ($450.00 BZD - 1st/15th Split)'
      },
      {
        id: 'pay_102',
        receiptNumber: 'RFBZ-2026-0892',
        tenantId: 'ten_1',
        unitId: 'unit_1',
        billingMonth: 'November 2026',
        amount: 445,
        method: 'E-Kyash Wallet',
        referenceNo: 'EKY-7731092',
        submittedAt: '2026-11-12 04:40 PM',
        confirmedAt: null,
        status: 'pending',
        rejectionReason: '',
        customImageDataUrl: null,
        receiptLabel: 'E-Kyash Transfer Screenshot ($445.00 BZD — Remaining Rent + Water)'
      },
      {
        id: 'pay_103',
        receiptNumber: 'RFBZ-2026-0893',
        tenantId: 'ten_2',
        unitId: 'unit_2',
        billingMonth: 'November 2026',
        amount: 550,
        method: 'Atlantic Bank Transfer',
        referenceNo: 'ABL-44019283',
        submittedAt: '2026-11-12 06:12 PM',
        confirmedAt: null,
        status: 'pending',
        rejectionReason: '',
        customImageDataUrl: null,
        receiptLabel: 'Atlantic Bank Mobile Receipt ($550.00 BZD — Full Nov Rent)'
      },
      {
        id: 'pay_104',
        receiptNumber: 'RFBZ-2026-0884',
        tenantId: 'ten_3',
        unitId: 'unit_3',
        billingMonth: 'November 2026',
        amount: 1100,
        method: 'Heritage Bank Transfer',
        referenceNo: 'HBL-3019284',
        submittedAt: '2026-11-01 11:20 AM',
        confirmedAt: '2026-11-01 01:05 PM',
        status: 'confirmed',
        rejectionReason: '',
        customImageDataUrl: null,
        receiptLabel: 'Heritage Bank Corporate Transfer ($1,100.00 BZD)'
      },
      {
        id: 'pay_095',
        receiptNumber: 'RFBZ-2026-0840',
        tenantId: 'ten_1',
        unitId: 'unit_1',
        billingMonth: 'October 2026',
        amount: 890,
        method: 'Belize Bank Transfer',
        referenceNo: 'BBL-88210492',
        submittedAt: '2026-10-03 02:10 PM',
        confirmedAt: '2026-10-03 03:00 PM',
        status: 'confirmed',
        rejectionReason: '',
        customImageDataUrl: null,
        receiptLabel: 'Belize Bank Transfer ($890.00 BZD — Oct Rent + $40 Water)'
      }
    ],

    maintenanceTickets: [
      {
        id: 'tkt_1',
        unitId: 'unit_1',
        tenantId: 'ten_1',
        title: 'Kitchen Sink Pipe Slow Drip',
        category: 'Plumbing (BWS)',
        description:
          'The PVC trap under the kitchen sink is dripping slowly into a bucket. Needs washer or seal replacement so water bill stays low.',
        status: 'in_progress',
        createdAt: '2026-11-09 01:30 PM',
        landlordNote: 'Plumber scheduled for Friday morning at 9:00 AM.'
      },
      {
        id: 'tkt_2',
        unitId: 'unit_3',
        tenantId: 'ten_3',
        title: 'Front Roll-Down Shutter Lock Sticking',
        category: 'Security & Doors',
        description: 'Left padlock latch on Booth 3 shutter needs lubricant or alignment.',
        status: 'open',
        createdAt: '2026-11-11 05:15 PM',
        landlordNote: ''
      }
    ],

    notifications: [
      {
        id: 'notif_1',
        targetRole: 'landlord',
        tenantId: null,
        title: 'New Payment Receipt Uploaded',
        message: 'Keisha Leslie (Studio 1A) uploaded an Atlantic Bank receipt for $550.00 BZD. Please verify.',
        time: '12 mins ago',
        read: false
      },
      {
        id: 'notif_2',
        targetRole: 'landlord',
        tenantId: null,
        title: 'New Payment Receipt Uploaded',
        message: 'Kyan Avila (Apt 2B) uploaded an E-Kyash receipt for $445.00 BZD. Please verify.',
        time: '2 hours ago',
        read: false
      },
      {
        id: 'notif_3',
        targetRole: 'tenant',
        tenantId: 'ten_1',
        title: 'Partial Payment Confirmed ($450.00 BZD)',
        message:
          'Marcus Usher confirmed your Belize Bank transfer (Ref: BBL-99482104). Receipt #RFBZ-2026-0891 generated.',
        time: 'Nov 2, 2026',
        read: true
      }
    ]
  };
}

function formatBZD(amount) {
  const num = Number(amount || 0);
  return (
    '$' +
    num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) +
    ' BZD'
  );
}

export default function App() {
  // Core App State (Hydrated safely on client mount for Next.js SSR compatibility)
  const [data, setData] = useState(getInitialDemoData);
  const [isHydrated, setIsHydrated] = useState(false);

  // UI Overlays & Modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobilePreviewFrame, setMobilePreviewFrame] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // { type, payload }

  // Form States inside Modals / Tabs
  const [rejectReason, setRejectReason] = useState('');
  const [cashForm, setCashForm] = useState({ unitId: '', amount: '', note: 'Cash handed directly to Landlord' });
  const [utilForm, setUtilForm] = useState({ amount: 0, proof: '' });
  const [newUnitForm, setNewUnitForm] = useState({
    propertyId: 'prop_1',
    unitLabel: '',
    roomType: '1-Bedroom Studio',
    monthlyRent: '',
    depositAmount: '',
    utilityMode: 'included',
    utilityNote: 'Water & Light included; Digi/Speednet internet arranged by tenant.'
  });
  const [editUnitForm, setEditUnitForm] = useState({
    unitLabel: '',
    monthlyRent: 0,
    utilityMode: 'included',
    utilityNote: ''
  });
  const [bankForm, setBankForm] = useState(getInitialDemoData().landlord.bankInstructions);

  // Tenant Payment Form State
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Belize Bank Transfer');
  const [payRef, setPayRef] = useState('BBL-90482173');
  const [uploadedReceiptUrl, setUploadedReceiptUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Tenant Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    title: '',
    category: 'Plumbing (BWS)',
    description: ''
  });

  // Load persisted demo state in browser
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setBankForm(parsed.landlord.bankInstructions);
      }
    } catch (err) {
      console.warn('Unable to read saved state:', err);
    }
    setIsHydrated(true);
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Unable to save state:', err);
    }
  }, [data, isHydrated]);

  // Helper: Toast Notification
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Helper: Copy text safely
  const copyText = (text, label = 'Copied!') => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      addToast(label, 'success');
    } catch {
      addToast('Highlight and copy manually.', 'warning');
    }
    document.body.removeChild(textarea);
  };

  // Helper: Push In-App Notification
  const pushNotification = (targetRole, tenantId, title, message) => {
    setData((prev) => ({
      ...prev,
      notifications: [
        {
          id: 'notif_' + Date.now(),
          targetRole,
          tenantId,
          title,
          message,
          time: 'Just now',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  // Helper: Calculate Unit Ledger Financials
  const getUnitFinancials = (unit, allPayments = data.payments, billingMonth = data.billingMonth) => {
    const totalBilled =
      Number(unit.monthlyRent) +
      (unit.utilityMode === 'landlord_billed' ? Number(unit.utilityAddonAmount || 0) : 0);

    const unitPayments = allPayments.filter(
      (p) => p.unitId === unit.id && p.billingMonth === billingMonth
    );

    const confirmedPaid = unitPayments
      .filter((p) => p.status === 'confirmed')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const pendingAmount = unitPayments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const remainingBalance = Math.max(0, totalBilled - confirmedPaid);

    let status = 'unpaid';
    if (!unit.tenantId) status = 'vacant';
    else if (remainingBalance === 0 && totalBilled > 0) status = 'paid';
    else if (pendingAmount > 0) status = 'pending_review';
    else if (confirmedPaid > 0 && remainingBalance > 0) status = 'partial';

    return { totalBilled, confirmedPaid, pendingAmount, remainingBalance, status };
  };

  // Derived Portfolio Metrics
  const portfolioMetrics = useMemo(() => {
    const occupied = data.units.filter((u) => u.tenantId);
    let totalExpected = 0;
    let totalCollected = 0;
    let totalOutstanding = 0;

    occupied.forEach((u) => {
      const fin = getUnitFinancials(u);
      totalExpected += fin.totalBilled;
      totalCollected += fin.confirmedPaid;
      totalOutstanding += fin.remainingBalance;
    });

    const pendingPayments = data.payments.filter((p) => p.status === 'pending');
    const openTickets = data.maintenanceTickets.filter((t) => t.status !== 'resolved');

    return {
      occupiedCount: occupied.length,
      totalExpected,
      totalCollected,
      totalOutstanding,
      pendingPayments,
      openTicketsCount: openTickets.length
    };
  }, [data]);

  // Active Tenant & Unit objects
  const activeTenant = useMemo(
    () => data.tenants.find((t) => t.id === data.activeTenantId) || data.tenants[0],
    [data.tenants, data.activeTenantId]
  );

  const activeTenantUnit = useMemo(
    () => data.units.find((u) => u.id === activeTenant?.unitId),
    [data.units, activeTenant]
  );

  const activeTenantProp = useMemo(
    () => data.properties.find((p) => p.id === activeTenantUnit?.propertyId),
    [data.properties, activeTenantUnit]
  );

  const activeTenantFinancials = useMemo(
    () =>
      activeTenantUnit
        ? getUnitFinancials(activeTenantUnit)
        : { totalBilled: 0, confirmedPaid: 0, pendingAmount: 0, remainingBalance: 0, status: 'unpaid' },
    [activeTenantUnit, data.payments, data.billingMonth]
  );

  // Sync suggested payment amount when switching tenant or opening Pay tab
  useEffect(() => {
    const suggested =
      activeTenantFinancials.remainingBalance > 0
        ? activeTenantFinancials.remainingBalance
        : activeTenantUnit?.monthlyRent || 500;
    setPayAmount(String(suggested));
  }, [activeTenant?.id, activeTenantFinancials.remainingBalance, activeTenantUnit?.monthlyRent]);

  // Relevant Notifications
  const relevantNotifications = useMemo(() => {
    if (data.currentRole === 'landlord') {
      return data.notifications.filter((n) => n.targetRole === 'landlord');
    }
    return data.notifications.filter(
      (n) => n.targetRole === 'tenant' && n.tenantId === data.activeTenantId
    );
  }, [data.notifications, data.currentRole, data.activeTenantId]);

  const unreadNotifCount = relevantNotifications.filter((n) => !n.read).length;

  // Action: Confirm Tenant Payment
  const handleConfirmPayment = (paymentId) => {
    const targetPay = data.payments.find((p) => p.id === paymentId);
    if (!targetPay) return;

    const confirmedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const updatedPayments = data.payments.map((p) =>
      p.id === paymentId ? { ...p, status: 'confirmed', confirmedAt } : p
    );

    const unit = data.units.find((u) => u.id === targetPay.unitId);
    const updatedTenants = data.tenants.map((t) => {
      if (t.id === targetPay.tenantId && unit) {
        const finAfter = getUnitFinancials(unit, updatedPayments, data.billingMonth);
        if (finAfter.remainingBalance === 0) {
          return { ...t, monthsPaidCount: t.monthsPaidCount + 1 };
        }
      }
      return t;
    });

    setData((prev) => ({
      ...prev,
      payments: updatedPayments,
      tenants: updatedTenants
    }));

    pushNotification(
      'tenant',
      targetPay.tenantId,
      `Payment Received! (${formatBZD(targetPay.amount)})`,
      `${data.landlord.name} confirmed your ${targetPay.method} transfer (Ref: ${targetPay.referenceNo}). Official Receipt #${targetPay.receiptNumber} is ready.`
    );

    setActiveModal(null);
    addToast(
      `Payment of ${formatBZD(targetPay.amount)} confirmed! Official receipt #${targetPay.receiptNumber} sent.`,
      'success'
    );
  };

  // Action: Decline Tenant Payment
  const handleRejectPayment = (paymentId) => {
    const targetPay = data.payments.find((p) => p.id === paymentId);
    if (!targetPay) return;

    const reason =
      rejectReason.trim() ||
      'Screenshot unclear or transfer reference could not be verified. Please re-upload.';

    setData((prev) => ({
      ...prev,
      payments: prev.payments.map((p) =>
        p.id === paymentId ? { ...p, status: 'rejected', rejectionReason: reason } : p
      )
    }));

    pushNotification(
      'tenant',
      targetPay.tenantId,
      'Payment Receipt Declined — Action Needed',
      `Your ${formatBZD(targetPay.amount)} receipt (${targetPay.referenceNo}) was declined: "${reason}"`
    );

    setRejectReason('');
    setActiveModal(null);
    addToast('Payment declined and tenant notified to re-upload.', 'warning');
  };

  // Action: Tenant Submits Payment Receipt
  const handleTenantSubmitReceipt = (e) => {
    e.preventDefault();
    const amount = parseFloat(payAmount);
    if (!activeTenant || !activeTenantUnit || isNaN(amount) || amount <= 0) return;

    const receiptNum = 'RFBZ-2026-' + Math.floor(1000 + Math.random() * 9000);
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    const newPayment = {
      id: 'pay_' + Date.now(),
      receiptNumber: receiptNum,
      tenantId: activeTenant.id,
      unitId: activeTenantUnit.id,
      billingMonth: data.billingMonth,
      amount,
      method: payMethod,
      referenceNo: payRef.trim(),
      submittedAt: nowStr,
      confirmedAt: null,
      status: 'pending',
      rejectionReason: '',
      customImageDataUrl: uploadedReceiptUrl,
      receiptLabel: uploadedFileName || `${payMethod} (${formatBZD(amount)})`
    };

    setData((prev) => ({
      ...prev,
      payments: [...prev.payments, newPayment],
      activeTenantTab: 'history'
    }));

    pushNotification(
      'landlord',
      null,
      `New Payment Uploaded — ${activeTenant.fullName}`,
      `${activeTenant.fullName} (${activeTenantUnit.unitLabel}) submitted a ${payMethod} receipt for ${formatBZD(amount)} (Ref: ${payRef}). Please confirm payment.`
    );

    setUploadedReceiptUrl(null);
    setUploadedFileName('');
    setPayRef('BBL-' + Math.floor(10000000 + Math.random() * 89999999));
    addToast(`Receipt submitted! Landlord ${data.landlord.name} has been notified.`, 'success');
  };

  // Action: Download Next.js / Capacitor Guide + Code Bundle
  const handleDownloadNextJsBlueprint = () => {
    const setupInstructions = `================================================================================
RENTFLOW BZ — NEXT.JS + CAPACITOR MOBILE APP SETUP GUIDE
================================================================================
You asked whether to build RentFlow BZ as Next.js or a Mobile App.
With Next.js + Capacitor, ONE codebase gives you BOTH:
  1. A live SaaS Web App (deployable to Vercel in 60 seconds)
  2. A native Android (.apk / Google Play) & iOS (App Store) mobile app!

QUICK START COMMANDS:
  1. npx create-next-app@latest rentflow-bz --typescript --tailwind --eslint
  2. cd rentflow-bz
  3. npm install lucide-react
  4. Copy the React component into src/app/page.tsx
  5. Test web/mobile UI locally: npm run dev

TURN INTO AN ANDROID / IOS MOBILE APP (CAPACITOR):
  1. Set \`output: 'export'\` inside next.config.mjs
  2. npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
  3. npx cap init "RentFlow BZ" "com.rentflowbz.app" --web-dir=out
  4. npm run build && npx cap add android && npx cap sync
  5. npx cap open android  (Opens directly in Android Studio to build APK!)
================================================================================`;

    const blob = new Blob([setupInstructions], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RentFlow_BZ_NextJS_and_Mobile_Setup.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Downloaded Next.js + Capacitor Mobile App setup guide!', 'success');
  };

  // Badge Renderers
  const renderUtilityBadge = (mode) => {
    if (mode === 'included') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Zap className="w-3 h-3" /> Water &amp; Light Included
        </span>
      );
    }
    if (mode === 'tenant_direct') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <User className="w-3 h-3" /> Tenant Pays BEL/BWS Direct
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
        <Droplets className="w-3 h-3" /> Landlord Billed Split
      </span>
    );
  };

  const renderStatusBadge = (status) => {
    const config = {
      paid: {
        cls: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        Icon: CheckCircle2,
        label: 'Paid in Full'
      },
      partial: {
        cls: 'bg-amber-100 text-amber-800 border-amber-200',
        Icon: PieChart,
        label: 'Partial Paid'
      },
      pending_review: {
        cls: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        Icon: Clock,
        label: 'Receipt Pending Review'
      },
      unpaid: {
        cls: 'bg-rose-100 text-rose-800 border-rose-200',
        Icon: AlertCircle,
        label: 'Rent Due'
      },
      vacant: {
        cls: 'bg-slate-100 text-slate-600 border-slate-200',
        Icon: DoorOpen,
        label: 'Vacant Unit'
      }
    };
    const item = config[status] || config.unpaid;
    const IconComp = item.Icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${item.cls}`}
      >
        <IconComp className="w-3.5 h-3.5" /> {item.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased">
      {/* TOP NAVIGATION & ROLE SWITCHER BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-800 flex items-center justify-center shadow-inner">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight">
                  RentFlow <span className="text-teal-400">BZ</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  NEXT.JS + CAPACITOR MOBILE READY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Belize Rent, BEL/BWS Utility Splits &amp; Receipt Verification
              </p>
            </div>
          </div>

          {/* Role Switcher (Landlord vs Tenant) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setData((prev) => ({ ...prev, currentRole: 'landlord' }))}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                data.currentRole === 'landlord'
                  ? 'bg-cyan-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Landlord</span>
            </button>
            <button
              onClick={() => setData((prev) => ({ ...prev, currentRole: 'tenant' }))}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                data.currentRole === 'tenant'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Tenant</span>
            </button>

            {data.currentRole === 'tenant' && (
              <select
                value={data.activeTenantId}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, activeTenantId: e.target.value }))
                }
                className="bg-slate-900 text-teal-300 text-xs font-medium rounded-lg px-2 py-1.5 border border-slate-600 focus:outline-none max-w-[155px] sm:max-w-[210px]"
              >
                {data.tenants.map((t) => {
                  const u = data.units.find((x) => x.id === t.unitId);
                  return (
                    <option key={t.id} value={t.id}>
                      {t.fullName} ({u ? u.unitLabel.split(' ')[0] : ''})
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* Right Controls: Mobile Phone Preview Toggle, Notifications, Reset, Setup Guide */}
          <div className="flex items-center gap-2">
            {/* Toggle Mobile App Phone Frame Preview */}
            <button
              onClick={() => setMobilePreviewFrame((v) => !v)}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold border transition ${
                mobilePreviewFrame
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Preview as a Native Mobile App screen"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{mobilePreviewFrame ? 'Exit Phone View' : 'Mobile App View'}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((v) => !v)}
                className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <button
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          notifications: prev.notifications.map((n) =>
                            n.targetRole === prev.currentRole ? { ...n, read: true } : n
                          )
                        }));
                      }}
                      className="text-xs font-semibold text-cyan-700 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {relevantNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      relevantNotifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3.5 ${n.read ? 'bg-white' : 'bg-cyan-50/60'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-slate-900">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo */}
            <button
              onClick={() => setActiveModal({ type: 'reset' })}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Download Next.js + Mobile App Setup Guide */}
            <button
              onClick={handleDownloadNextJsBlueprint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile Setup Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATIONS */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => {
          const styles = {
            success: 'bg-emerald-900 text-white border-emerald-700',
            info: 'bg-slate-900 text-white border-slate-700',
            warning: 'bg-amber-900 text-white border-amber-700',
            error: 'bg-rose-900 text-white border-rose-700'
          };
          const IconComp =
            t.type === 'success'
              ? CheckCircle2
              : t.type === 'warning'
              ? AlertTriangle
              : t.type === 'error'
              ? XCircle
              : Info;
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-2.5 px-4 py-3 rounded-xl border shadow-xl text-xs sm:text-sm font-medium ${
                styles[t.type] || styles.info
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{t.message}</div>
            </div>
          );
        })}
      </div>

      {/* MAIN WORKSPACE (Supports both Desktop SaaS View and Native Mobile App Frame Preview) */}
      <main
        className={`flex-1 w-full mx-auto transition-all duration-300 ${
          mobilePreviewFrame
            ? 'max-w-[430px] my-6 bg-slate-50 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden px-3 py-4'
            : 'max-w-7xl px-3 sm:px-6 py-5 sm:py-7'
        }`}
      >
        {mobilePreviewFrame && (
          <div className="w-28 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
        )}

        {data.currentRole === 'landlord' ? (
          /* ================= LANDLORD PORTAL ================= */
          <div>
            {/* Landlord Profile Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-800 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    MU
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-bold text-lg sm:text-xl text-slate-900">
                        {data.landlord.name}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
                        {data.landlord.plan}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {data.landlord.company} • Billing Cycle:{' '}
                      <strong className="text-slate-700">{data.billingMonth}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      const firstOccupied = data.units.find((u) => u.tenantId);
                      setCashForm({
                        unitId: firstOccupied ? firstOccupied.id : '',
                        amount: '',
                        note: 'Cash handed directly to Landlord'
                      });
                      setActiveModal({ type: 'cash' });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                  >
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Record Cash</span>
                  </button>
                  <button
                    onClick={() => setActiveModal({ type: 'addUnit' })}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Unit &amp; Invite</span>
                  </button>
                </div>
              </div>

              {/* Landlord Navigation Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-100">
                {[
                  { id: 'dashboard', label: 'Tenant Roster & Balances', Icon: LayoutDashboard },
                  {
                    id: 'verifications',
                    label: `Verify Receipts (${portfolioMetrics.pendingPayments.length})`,
                    Icon: FileCheck2
                  },
                  { id: 'units', label: 'Units, Utilities & Invites', Icon: Building },
                  { id: 'bank', label: 'Bank & E-Kyash Info', Icon: Landmark },
                  {
                    id: 'maintenance',
                    label: `Maintenance (${portfolioMetrics.openTicketsCount})`,
                    Icon: Wrench
                  },
                  { id: 'history', label: 'Payment Ledger', Icon: Receipt }
                ].map((tab) => {
                  const IconComp = tab.Icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setData((prev) => ({ ...prev, activeLandlordTab: tab.id }))
                      }
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        data.activeLandlordTab === tab.id
                          ? 'bg-cyan-800 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div
              className={`grid gap-4 mb-6 ${
                mobilePreviewFrame
                  ? 'grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Expected Rent</span>
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-extrabold text-lg sm:text-2xl text-slate-900 mt-2">
                  {formatBZD(portfolioMetrics.totalExpected)}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {portfolioMetrics.occupiedCount} active units
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Confirmed Paid</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-extrabold text-lg sm:text-2xl text-emerald-700 mt-2">
                  {formatBZD(portfolioMetrics.totalCollected)}
                </p>
                <p className="text-[11px] text-emerald-600 mt-1">Verified transfers &amp; cash</p>
              </div>

              <div
                onClick={() =>
                  setData((prev) => ({ ...prev, activeLandlordTab: 'verifications' }))
                }
                className={`cursor-pointer bg-white rounded-2xl border ${
                  portfolioMetrics.pendingPayments.length > 0
                    ? 'border-indigo-300 ring-2 ring-indigo-100'
                    : 'border-slate-200'
                } p-4 shadow-xs hover:border-indigo-400 transition`}
              >
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Pending Review</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ScanLine className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-extrabold text-lg sm:text-2xl text-indigo-700 mt-2">
                  {portfolioMetrics.pendingPayments.length} Receipt
                  {portfolioMetrics.pendingPayments.length === 1 ? '' : 's'}
                </p>
                <p className="text-[11px] text-indigo-600 font-medium mt-1">Tap to verify →</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Balance Due</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-extrabold text-lg sm:text-2xl text-rose-700 mt-2">
                  {formatBZD(portfolioMetrics.totalOutstanding)}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Includes pending reviews</p>
              </div>
            </div>

            {/* LANDLORD TAB VIEWS */}
            {data.activeLandlordTab === 'dashboard' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h2 className="font-bold text-base text-slate-900">
                    All Tenants &amp; Unit Balances ({data.billingMonth})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Unit rates, BEL/BWS utility arrangements, months paid, and remaining balances
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4">Tenant &amp; Unit</th>
                        <th className="py-3 px-4">Rate &amp; Utilities</th>
                        <th className="py-3 px-4">Months Paid</th>
                        <th className="py-3 px-4">Paid</th>
                        <th className="py-3 px-4">Balance Due</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {data.units.map((unit) => {
                        const tenant = data.tenants.find((t) => t.id === unit.tenantId);
                        const prop = data.properties.find((p) => p.id === unit.propertyId);
                        const fin = getUnitFinancials(unit);

                        return (
                          <tr key={unit.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4">
                              {tenant ? (
                                <>
                                  <div className="font-bold text-slate-900">{tenant.fullName}</div>
                                  <div className="text-xs font-semibold text-cyan-700">
                                    {unit.unitLabel}
                                  </div>
                                  <div className="text-[11px] text-slate-400">
                                    {prop?.name} • {tenant.phone}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="font-bold text-slate-500">Vacant Unit</div>
                                  <div className="text-xs font-semibold text-slate-700">
                                    {unit.unitLabel}
                                  </div>
                                  <div className="text-[11px] text-slate-400">
                                    Invite:{' '}
                                    <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
                                      {unit.inviteCode}
                                    </code>
                                  </div>
                                </>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">
                                {formatBZD(unit.monthlyRent)}
                                <span className="text-xs font-normal text-slate-500">/mo</span>
                              </div>
                              <div className="mt-1">{renderUtilityBadge(unit.utilityMode)}</div>
                              {unit.utilityMode === 'landlord_billed' &&
                                unit.utilityAddonAmount > 0 && (
                                  <div className="text-[11px] text-sky-700 font-medium mt-1">
                                    + {formatBZD(unit.utilityAddonAmount)} utility split
                                  </div>
                                )}
                            </td>
                            <td className="py-3.5 px-4">
                              {tenant ? (
                                <>
                                  <div className="text-xs font-semibold text-slate-800">
                                    {tenant.monthsPaidCount} Months Paid
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Ends {tenant.leaseEnd}
                                  </div>
                                </>
                              ) : (
                                <span className="text-xs text-slate-400">—</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-emerald-700">
                              {tenant ? formatBZD(fin.confirmedPaid) : '—'}
                              {fin.pendingAmount > 0 && (
                                <div className="text-[11px] text-indigo-600 font-medium">
                                  + {formatBZD(fin.pendingAmount)} pending
                                </div>
                              )}
                            </td>
                            <td
                              className={`py-3.5 px-4 font-bold ${
                                fin.remainingBalance > 0 && tenant
                                  ? 'text-rose-700'
                                  : 'text-slate-700'
                              }`}
                            >
                              {tenant ? formatBZD(fin.remainingBalance) : '—'}
                            </td>
                            <td className="py-3.5 px-4">{renderStatusBadge(fin.status)}</td>
                            <td className="py-3.5 px-4 text-right">
                              {tenant ? (
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() =>
                                      setActiveModal({ type: 'tenantLedger', payload: tenant })
                                    }
                                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                                  >
                                    Ledger
                                  </button>
                                  {unit.utilityMode === 'landlord_billed' && (
                                    <button
                                      onClick={() => {
                                        setUtilForm({
                                          amount: unit.utilityAddonAmount,
                                          proof: unit.utilityBillProof || 'BWS Water Sub-Meter Share'
                                        });
                                        setActiveModal({ type: 'utility', payload: unit });
                                      }}
                                      className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold"
                                    >
                                      +Utility
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    copyText(
                                      `Join ${prop?.name || 'our property'} (${unit.unitLabel} - ${formatBZD(unit.monthlyRent)}/mo) on RentFlow BZ using Invite Code: ${unit.inviteCode}`,
                                      `Invite code ${unit.inviteCode} copied!`
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 text-xs font-semibold"
                                >
                                  Copy Invite
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {data.activeLandlordTab === 'verifications' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="pb-4 border-b border-slate-200">
                  <h2 className="font-bold text-base text-slate-900">
                    Pending Bank &amp; E-Kyash Receipt Verifications
                  </h2>
                  <p className="text-xs text-slate-500">
                    Inspect uploaded transfer screenshots, confirm funds received, and issue official receipts.
                  </p>
                </div>

                {portfolioMetrics.pendingPayments.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <CheckCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">All Caught Up!</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      No pending payment screenshots waiting for review. Switch to the Tenant tab to test submitting a receipt.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    {portfolioMetrics.pendingPayments.map((pay) => {
                      const tenant = data.tenants.find((t) => t.id === pay.tenantId);
                      const unit = data.units.find((u) => u.id === pay.unitId);
                      return (
                        <div
                          key={pay.id}
                          className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-4 flex flex-col justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                                  <Clock className="w-3 h-3" /> Pending Verification
                                </span>
                                <h3 className="font-bold text-base text-slate-900 mt-1.5">
                                  {tenant?.fullName}
                                </h3>
                                <p className="text-xs text-slate-600">
                                  {unit?.unitLabel} • {pay.billingMonth}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-extrabold text-lg text-cyan-800">
                                  {formatBZD(pay.amount)}
                                </div>
                                <div className="text-[11px] font-semibold text-slate-500">
                                  {pay.method}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Transfer Ref #:</span>
                                <span className="font-mono font-bold text-slate-800">
                                  {pay.referenceNo}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Submitted:</span>
                                <span className="text-slate-700">{pay.submittedAt}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-indigo-100">
                            <button
                              onClick={() => {
                                setRejectReason('');
                                setActiveModal({ type: 'inspectReceipt', payload: pay });
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold"
                            >
                              <Eye className="w-3.5 h-3.5" /> Inspect Receipt
                            </button>
                            <button
                              onClick={() => handleConfirmPayment(pay.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Payment
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {data.activeLandlordTab === 'units' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="font-bold text-base text-slate-900">
                      Units, Custom Pricing &amp; Utility Controls
                    </h2>
                    <p className="text-xs text-slate-500">
                      Control room pricing, BEL/BWS utility visibility, and tenant group invite codes.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveModal({ type: 'addUnit' })}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white text-xs font-semibold self-start"
                  >
                    <PlusCircle className="w-4 h-4" /> Add New Unit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  {data.units.map((unit) => {
                    const prop = data.properties.find((p) => p.id === unit.propertyId);
                    const tenant = data.tenants.find((t) => t.id === unit.tenantId);

                    return (
                      <div
                        key={unit.id}
                        className="border border-slate-200 rounded-2xl p-4 hover:border-cyan-400 transition flex flex-col justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                {prop?.name}
                              </span>
                              <h3 className="font-bold text-base text-slate-900">
                                {unit.unitLabel}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {unit.roomType} • Deposit: {formatBZD(unit.depositAmount)}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-extrabold text-lg text-cyan-800">
                                {formatBZD(unit.monthlyRent)}
                              </div>
                              <span className="text-[11px] text-slate-400">per month</span>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div>{renderUtilityBadge(unit.utilityMode)}</div>
                            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              {unit.utilityNote}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-xs">
                            {tenant ? (
                              <span className="text-emerald-700 font-semibold">
                                Occupied by {tenant.fullName}
                              </span>
                            ) : (
                              <span className="text-amber-700 font-semibold">
                                Vacant • Code:{' '}
                                <code className="bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                  {unit.inviteCode}
                                </code>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                copyText(
                                  `RentFlow BZ Invite — ${prop?.name} | ${unit.unitLabel} | ${formatBZD(unit.monthlyRent)}/mo | Invite Code: ${unit.inviteCode}`,
                                  `Invite code ${unit.inviteCode} copied!`
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-semibold"
                            >
                              Share Invite
                            </button>
                            <button
                              onClick={() => {
                                setEditUnitForm({
                                  unitLabel: unit.unitLabel,
                                  monthlyRent: unit.monthlyRent,
                                  utilityMode: unit.utilityMode,
                                  utilityNote: unit.utilityNote
                                });
                                setActiveModal({ type: 'editUnit', payload: unit });
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {data.activeLandlordTab === 'bank' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs max-w-3xl">
                <div className="pb-4 border-b border-slate-200">
                  <h2 className="font-bold text-base text-slate-900">
                    Belize Bank &amp; Mobile Wallet Payment Instructions
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Displayed automatically to tenants on their Payment tab before uploading a receipt.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setData((prev) => ({
                      ...prev,
                      landlord: { ...prev.landlord, bankInstructions: bankForm }
                    }));
                    addToast('Bank & wallet instructions updated for all tenants!', 'success');
                  }}
                  className="mt-5 space-y-4 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Belize Bank Account
                    </label>
                    <input
                      type="text"
                      value={bankForm.belizeBank}
                      onChange={(e) => setBankForm({ ...bankForm, belizeBank: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Atlantic Bank Account
                    </label>
                    <input
                      type="text"
                      value={bankForm.atlanticBank}
                      onChange={(e) => setBankForm({ ...bankForm, atlanticBank: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Heritage Bank Account
                    </label>
                    <input
                      type="text"
                      value={bankForm.heritageBank}
                      onChange={(e) => setBankForm({ ...bankForm, heritageBank: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        E-Kyash Wallet
                      </label>
                      <input
                        type="text"
                        value={bankForm.eKyash}
                        onChange={(e) => setBankForm({ ...bankForm, eKyash: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">DigiWallet</label>
                      <input
                        type="text"
                        value={bankForm.digiWallet}
                        onChange={(e) => setBankForm({ ...bankForm, digiWallet: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Payment Reference Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={bankForm.notes}
                      onChange={(e) => setBankForm({ ...bankForm, notes: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white text-xs sm:text-sm font-semibold"
                  >
                    Save Payment Instructions
                  </button>
                </form>
              </div>
            )}

            {data.activeLandlordTab === 'maintenance' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h2 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
                  Tenant Maintenance &amp; Repair Requests
                </h2>
                <div className="space-y-4 mt-4">
                  {data.maintenanceTickets.map((tkt) => {
                    const unit = data.units.find((u) => u.id === tkt.unitId);
                    const tenant = data.tenants.find((t) => t.id === tkt.tenantId);
                    return (
                      <div key={tkt.id} className="border border-slate-200 rounded-2xl p-4 space-y-2">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold uppercase text-cyan-700">
                              {unit?.unitLabel} • {tkt.category}
                            </span>
                            <h3 className="font-bold text-sm sm:text-base text-slate-900">
                              {tkt.title}
                            </h3>
                            <p className="text-[11px] text-slate-400">
                              Reported by {tenant?.fullName} on {tkt.createdAt}
                            </p>
                          </div>
                          <select
                            value={tkt.status}
                            onChange={(e) => {
                              const nextStatus = e.target.value;
                              setData((prev) => ({
                                ...prev,
                                maintenanceTickets: prev.maintenanceTickets.map((item) =>
                                  item.id === tkt.id ? { ...item, status: nextStatus } : item
                                )
                              }));
                              pushNotification(
                                'tenant',
                                tkt.tenantId,
                                'Maintenance Ticket Updated',
                                `Your ticket "${tkt.title}" is now ${nextStatus.replace('_', ' ').toUpperCase()}.`
                              );
                              addToast('Ticket status updated!', 'success');
                            }}
                            className="text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-300 bg-slate-50"
                          >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <p className="text-xs text-slate-600">{tkt.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {data.activeLandlordTab === 'history' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h2 className="font-bold text-base text-slate-900">
                    Complete Payment Ledger &amp; Official Receipts
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4">Receipt #</th>
                        <th className="py-3 px-4">Tenant / Unit</th>
                        <th className="py-3 px-4">Billing Month</th>
                        <th className="py-3 px-4">Method &amp; Ref</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4 text-right">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {[...data.payments].reverse().map((pay) => {
                        const tenant = data.tenants.find((t) => t.id === pay.tenantId);
                        const unit = data.units.find((u) => u.id === pay.unitId);
                        return (
                          <tr key={pay.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-mono font-bold text-slate-800">
                              {pay.receiptNumber}
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{tenant?.fullName}</div>
                              <div className="text-slate-500">{unit?.unitLabel}</div>
                            </td>
                            <td className="py-3 px-4">{pay.billingMonth}</td>
                            <td className="py-3 px-4">
                              <div>{pay.method}</div>
                              <div className="font-mono text-[11px] text-slate-500">
                                {pay.referenceNo}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-bold">{formatBZD(pay.amount)}</td>
                            <td className="py-3 px-4 text-right">
                              {pay.status === 'confirmed' ? (
                                <button
                                  onClick={() =>
                                    setActiveModal({ type: 'officialReceipt', payload: pay })
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-50 text-cyan-800 font-semibold"
                                >
                                  <Printer className="w-3.5 h-3.5" /> Official Receipt
                                </button>
                              ) : (
                                <span className="capitalize font-semibold text-indigo-700">
                                  {pay.status}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ================= TENANT PORTAL (ISOLATED VIEW) ================= */
          <div>
            {/* Tenant Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {activeTenant?.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-bold text-lg sm:text-xl text-slate-900">
                        Welcome, {activeTenant?.fullName}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                        Tenant Member • Free Forever
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      <strong className="text-slate-800">{activeTenantUnit?.unitLabel}</strong> at{' '}
                      {activeTenantProp?.name} • Landlord: {data.landlord.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setData((prev) => ({ ...prev, activeTenantTab: 'pay' }))}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white text-xs font-semibold shadow-xs self-start md:self-auto"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Pay Rent &amp; Upload Receipt</span>
                </button>
              </div>

              {/* Tenant Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-100">
                {[
                  { id: 'overview', label: 'My Unit & Balance', Icon: Home },
                  { id: 'pay', label: 'Make Payment & Upload Receipt', Icon: CreditCard },
                  { id: 'history', label: 'My Payment History', Icon: Receipt },
                  { id: 'maintenance', label: 'Maintenance & Rules', Icon: Wrench }
                ].map((tab) => {
                  const IconComp = tab.Icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setData((prev) => ({ ...prev, activeTenantTab: tab.id }))
                      }
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        data.activeTenantTab === tab.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {data.activeTenantTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                    <div>
                      <h2 className="font-bold text-base text-slate-900">
                        {data.billingMonth} Statement
                      </h2>
                      <p className="text-xs text-slate-500">
                        Due Date: {activeTenantUnit?.dueDate} • Private Tenant Portal
                      </p>
                    </div>
                    {renderStatusBadge(activeTenantFinancials.status)}
                  </div>

                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">
                        Base Monthly Rent ({activeTenantUnit?.roomType})
                      </span>
                      <span className="font-bold text-slate-900">
                        {formatBZD(activeTenantUnit?.monthlyRent)}
                      </span>
                    </div>

                    <div className="flex justify-between items-start py-2 border-b border-slate-100">
                      <div>
                        <div className="text-slate-600">
                          Utilities (BEL Electricity &amp; BWS Water)
                        </div>
                        <div className="mt-1">
                          {activeTenantUnit && renderUtilityBadge(activeTenantUnit.utilityMode)}
                        </div>
                        {activeTenantUnit?.utilityBillProof && (
                          <div className="text-[11px] text-sky-700 mt-1">
                            {activeTenantUnit.utilityBillProof}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">
                        {activeTenantUnit?.utilityMode === 'landlord_billed'
                          ? formatBZD(activeTenantUnit.utilityAddonAmount)
                          : '$0.00 BZD'}
                      </span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100 text-emerald-700">
                      <span>Confirmed Payments ({data.billingMonth})</span>
                      <span className="font-bold">
                        - {formatBZD(activeTenantFinancials.confirmedPaid)}
                      </span>
                    </div>

                    {activeTenantFinancials.pendingAmount > 0 && (
                      <div className="flex justify-between py-2 border-b border-slate-100 text-indigo-700">
                        <span>Pending Landlord Verification</span>
                        <span className="font-semibold">
                          {formatBZD(activeTenantFinancials.pendingAmount)} (Awaiting Approval)
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3">
                      <span className="font-bold text-base text-slate-900">
                        Remaining Balance Due
                      </span>
                      <span
                        className={`font-extrabold text-2xl ${
                          activeTenantFinancials.remainingBalance > 0
                            ? 'text-rose-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {formatBZD(activeTenantFinancials.remainingBalance)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => setData((prev) => ({ ...prev, activeTenantTab: 'pay' }))}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white text-xs sm:text-sm font-semibold shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transfer &amp; Upload Payment Receipt</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <h2 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
                    My Lease &amp; Unit Details
                  </h2>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Property:</span>
                      <span className="font-semibold text-slate-900">{activeTenantProp?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Unit:</span>
                      <span className="font-semibold text-slate-900">
                        {activeTenantUnit?.unitLabel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lease Period:</span>
                      <span className="font-semibold text-slate-900">
                        {activeTenant?.leaseStart} → {activeTenant?.leaseEnd}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Security Deposit Held:</span>
                      <span className="font-bold text-emerald-700">
                        {formatBZD(activeTenantUnit?.depositAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Months Paid:</span>
                      <span className="font-bold text-slate-900">
                        {activeTenant?.monthsPaidCount} Months
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <strong className="text-slate-800 block mb-1">Utility Arrangement:</strong>
                    {activeTenantUnit?.utilityNote}
                  </div>
                </div>
              </div>
            )}

            {data.activeTenantTab === 'pay' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Step 1: Bank Details */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="pb-3 border-b border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                      Step 1 • Make Transfer
                    </span>
                    <h2 className="font-bold text-base text-slate-900 mt-0.5">
                      Landlord Bank &amp; Mobile Wallet Info
                    </h2>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {[
                      { label: 'Belize Bank', val: data.landlord.bankInstructions.belizeBank },
                      { label: 'Atlantic Bank', val: data.landlord.bankInstructions.atlanticBank },
                      { label: 'Heritage Bank', val: data.landlord.bankInstructions.heritageBank },
                      { label: 'E-Kyash', val: data.landlord.bankInstructions.eKyash },
                      { label: 'DigiWallet', val: data.landlord.bankInstructions.digiWallet }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-slate-800">{item.label}</div>
                          <div className="text-slate-600 mt-0.5 break-all">{item.val}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyText(item.val, `${item.label} details copied!`)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-cyan-50 text-cyan-800 shrink-0"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Upload Receipt */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                  <div className="pb-3 border-b border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
                      Step 2 • Notify Landlord
                    </span>
                    <h2 className="font-bold text-base text-slate-900 mt-0.5">
                      Upload Transfer Receipt Screenshot
                    </h2>
                  </div>

                  <form onSubmit={handleTenantSubmitReceipt} className="mt-4 space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Amount Transferred (BZD)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          required
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Payment Method
                        </label>
                        <select
                          value={payMethod}
                          onChange={(e) => setPayMethod(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                        >
                          <option value="Belize Bank Transfer">Belize Bank Online Transfer</option>
                          <option value="Atlantic Bank Transfer">
                            Atlantic Bank Online Transfer
                          </option>
                          <option value="Heritage Bank Transfer">
                            Heritage Bank Online Transfer
                          </option>
                          <option value="E-Kyash Wallet">E-Kyash Wallet</option>
                          <option value="DigiWallet">DigiWallet</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bank Transfer / Wallet Reference #
                      </label>
                      <input
                        type="text"
                        required
                        value={payRef}
                        onChange={(e) => setPayRef(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Receipt Screenshot
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50">
                        <input
                          id="nextjs-receipt-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              setUploadedReceiptUrl(evt.target?.result || null);
                              setUploadedFileName(file.name);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />

                        {uploadedReceiptUrl ? (
                          <div className="space-y-2">
                            <img
                              src={uploadedReceiptUrl}
                              alt="Uploaded receipt"
                              className="max-h-40 mx-auto rounded-xl border border-slate-300"
                            />
                            <p className="text-xs font-semibold text-emerald-700">
                              Attached: {uploadedFileName}
                            </p>
                          </div>
                        ) : uploadedFileName ? (
                          <div className="text-xs font-semibold text-emerald-700 py-2">
                            ✓ {uploadedFileName} Attached &amp; Ready
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mx-auto">
                              <ImagePlus className="w-5 h-5" />
                            </div>
                            <p className="text-xs text-slate-600">
                              Upload screenshot from phone or attach a sample demo receipt
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById('nextjs-receipt-file')?.click()
                            }
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold"
                          >
                            Choose Image
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedReceiptUrl(null);
                              setUploadedFileName('Sample_Belize_Bank_Receipt.png');
                              addToast('Sample receipt attached!', 'info');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold"
                          >
                            Use Sample Receipt
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Payment &amp; Notify Landlord</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {data.activeTenantTab === 'history' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-base text-slate-900">
                      My Payment History &amp; Official Receipts
                    </h2>
                    <p className="text-xs text-slate-500">
                      Private ledger visible only to you and your landlord
                    </p>
                  </div>
                  <button
                    onClick={() => setData((prev) => ({ ...prev, activeTenantTab: 'pay' }))}
                    className="px-3.5 py-2 rounded-xl bg-cyan-800 text-white text-xs font-semibold"
                  >
                    + Submit Payment
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {data.payments
                    .filter((p) => p.tenantId === activeTenant?.id)
                    .reverse()
                    .map((p) => (
                      <div
                        key={p.id}
                        className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-slate-900">
                              {formatBZD(p.amount)}
                            </span>
                            <span className="text-xs text-slate-500">• {p.billingMonth}</span>
                            {p.status === 'confirmed' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                Payment Received
                              </span>
                            ) : p.status === 'pending' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                                Awaiting Landlord Confirmation
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                                Declined
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {p.method} • Ref #:{' '}
                            <span className="font-mono font-semibold">{p.referenceNo}</span> •{' '}
                            {p.submittedAt}
                          </div>
                          {p.status === 'rejected' && (
                            <div className="text-xs text-rose-700 font-medium mt-1">
                              Landlord Note: &ldquo;{p.rejectionReason}&rdquo;
                            </div>
                          )}
                        </div>

                        <div>
                          {p.status === 'confirmed' ? (
                            <button
                              onClick={() =>
                                setActiveModal({ type: 'officialReceipt', payload: p })
                              }
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                            >
                              <FileBadge className="w-4 h-4" />
                              <span>Official Receipt</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Receipt generates on confirmation
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {data.activeTenantTab === 'maintenance' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h2 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
                    Report a Maintenance or Repair Issue
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!activeTenant || !activeTenantUnit) return;
                      const nowStr = new Date().toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      });
                      setData((prev) => ({
                        ...prev,
                        maintenanceTickets: [
                          ...prev.maintenanceTickets,
                          {
                            id: 'tkt_' + Date.now(),
                            unitId: activeTenantUnit.id,
                            tenantId: activeTenant.id,
                            title: ticketForm.title,
                            category: ticketForm.category,
                            description: ticketForm.description,
                            status: 'open',
                            createdAt: nowStr,
                            landlordNote: ''
                          }
                        ]
                      }));
                      pushNotification(
                        'landlord',
                        null,
                        `New Maintenance Ticket — ${activeTenantUnit.unitLabel}`,
                        `${activeTenant.fullName} reported: "${ticketForm.title}".`
                      );
                      setTicketForm({ title: '', category: 'Plumbing (BWS)', description: '' });
                      addToast('Maintenance ticket submitted to landlord!', 'success');
                    }}
                    className="mt-4 space-y-3.5 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Issue Title
                        </label>
                        <input
                          type="text"
                          required
                          value={ticketForm.title}
                          onChange={(e) =>
                            setTicketForm({ ...ticketForm, title: e.target.value })
                          }
                          placeholder="e.g., Bathroom faucet leaking"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={ticketForm.category}
                          onChange={(e) =>
                            setTicketForm({ ...ticketForm, category: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                        >
                          <option>Plumbing (BWS)</option>
                          <option>Electrical (BEL)</option>
                          <option>AC / Cooling</option>
                          <option>Doors, Windows &amp; Locks</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={ticketForm.description}
                        onChange={(e) =>
                          setTicketForm({ ...ticketForm, description: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-cyan-800 text-white text-xs font-semibold"
                    >
                      Submit Repair Ticket
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h2 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-200">
                    Property House Rules
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 mb-3">{activeTenantProp?.address}</p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 leading-relaxed">
                      {activeTenantProp?.houseRules}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= MODALS ================= */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden my-auto"
          >
            {/* Modal: Inspect Receipt */}
            {activeModal.type === 'inspectReceipt' && (() => {
              const pay = activeModal.payload;
              const tenant = data.tenants.find((t) => t.id === pay.tenantId);
              const unit = data.units.find((u) => u.id === pay.unitId);
              return (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        Inspect Tenant Payment Proof
                      </h3>
                      <p className="text-xs text-slate-500">
                        {tenant?.fullName} • {unit?.unitLabel}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="my-5 bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    {pay.customImageDataUrl ? (
                      <img
                        src={pay.customImageDataUrl}
                        alt="Transfer receipt"
                        className="max-h-72 mx-auto rounded-xl"
                      />
                    ) : (
                      <div className="max-w-sm mx-auto bg-slate-900 text-white rounded-2xl p-5 font-mono text-xs space-y-2">
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                          <span className="text-teal-400 font-bold">{pay.method}</span>
                          <span className="text-emerald-300">TRANSFER SENT</span>
                        </div>
                        <div className="text-center py-2">
                          <div className="text-slate-400 text-[10px]">AMOUNT</div>
                          <div className="text-2xl font-bold">{formatBZD(pay.amount)}</div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">From:</span>
                          <span>{tenant?.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Reference #:</span>
                          <span className="text-amber-300 font-bold">{pay.referenceNo}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {pay.status === 'pending' && (
                    <div className="space-y-3">
                      <button
                        onClick={() => handleConfirmPayment(pay.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Payment &amp; Issue Receipt</span>
                      </button>
                      <div className="pt-3 border-t border-slate-200 flex gap-2">
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Reason if declining..."
                          className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs"
                        />
                        <button
                          onClick={() => handleRejectPayment(pay.id)}
                          className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal: Official Digital Rent Receipt */}
            {activeModal.type === 'officialReceipt' && (() => {
              const pay = activeModal.payload;
              const tenant = data.tenants.find((t) => t.id === pay.tenantId);
              const unit = data.units.find((u) => u.id === pay.unitId);
              const prop = data.properties.find((p) => p.id === unit?.propertyId);
              return (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-700">
                      Official Digital Rent Receipt
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-800 text-white text-xs font-semibold"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                      </button>
                      <button
                        onClick={() => setActiveModal(null)}
                        className="p-1.5 rounded-lg hover:bg-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 border-2 border-slate-900 rounded-2xl p-6 bg-white space-y-4">
                    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-800">
                          Official Belize Rent Receipt
                        </div>
                        <h2 className="font-extrabold text-lg text-slate-900">
                          {data.landlord.company}
                        </h2>
                        <p className="text-xs text-slate-600">
                          Landlord: {data.landlord.name} • {data.landlord.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold text-xs">
                          PAID &amp; VERIFIED
                        </span>
                        <div className="font-mono font-bold text-xs mt-1.5">
                          #{pay.receiptNumber}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-slate-400 uppercase font-bold text-[10px]">Tenant</div>
                        <div className="font-bold text-sm text-slate-900">{tenant?.fullName}</div>
                        <div className="text-slate-600">{tenant?.phone}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 uppercase font-bold text-[10px]">
                          Property &amp; Unit
                        </div>
                        <div className="font-bold text-sm text-slate-900">{unit?.unitLabel}</div>
                        <div className="text-slate-600">{prop?.address}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Billing Month:</span>
                        <span className="font-bold">{pay.billingMonth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Method &amp; Ref:</span>
                        <span className="font-mono font-bold">
                          {pay.method} ({pay.referenceNo})
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                        <span className="font-bold text-sm">Total Received:</span>
                        <span className="font-extrabold text-2xl text-emerald-700">
                          {formatBZD(pay.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Modal: Record Cash Payment */}
            {activeModal.type === 'cash' && (
              <div className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900">Record Cash Payment</h3>
                  <button onClick={() => setActiveModal(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const unit = data.units.find((u) => u.id === cashForm.unitId);
                    const amount = parseFloat(cashForm.amount);
                    if (!unit || !unit.tenantId || isNaN(amount) || amount <= 0) return;

                    const receiptNum = 'RFBZ-2026-' + Math.floor(1000 + Math.random() * 9000);
                    const nowStr = new Date().toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    });

                    setData((prev) => ({
                      ...prev,
                      payments: [
                        ...prev.payments,
                        {
                          id: 'pay_' + Date.now(),
                          receiptNumber: receiptNum,
                          tenantId: unit.tenantId,
                          unitId: unit.id,
                          billingMonth: prev.billingMonth,
                          amount,
                          method: 'Cash Payment',
                          referenceNo: 'CASH-' + Math.floor(10000 + Math.random() * 89999),
                          submittedAt: nowStr,
                          confirmedAt: nowStr,
                          status: 'confirmed',
                          rejectionReason: '',
                          customImageDataUrl: null,
                          receiptLabel: cashForm.note
                        }
                      ]
                    }));
                    pushNotification(
                      'tenant',
                      unit.tenantId,
                      `Cash Receipt #${receiptNum}`,
                      `${data.landlord.name} recorded your cash payment of ${formatBZD(amount)}.`
                    );
                    setActiveModal(null);
                    addToast(`Cash payment of ${formatBZD(amount)} recorded!`, 'success');
                  }}
                  className="mt-4 space-y-4 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-semibold mb-1">Tenant &amp; Unit</label>
                    <select
                      value={cashForm.unitId}
                      onChange={(e) => setCashForm({ ...cashForm, unitId: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    >
                      {data.units
                        .filter((u) => u.tenantId)
                        .map((u) => {
                          const t = data.tenants.find((x) => x.id === u.tenantId);
                          return (
                            <option key={u.id} value={u.id}>
                              {t?.fullName} — {u.unitLabel}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Cash Amount (BZD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      required
                      value={cashForm.amount}
                      onChange={(e) => setCashForm({ ...cashForm, amount: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold"
                  >
                    Confirm Cash &amp; Issue Receipt
                  </button>
                </form>
              </div>
            )}

            {/* Modal: Add Unit */}
            {activeModal.type === 'addUnit' && (
              <div className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900">
                    Add Rental Unit &amp; Invite Code
                  </h3>
                  <button onClick={() => setActiveModal(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const inviteCode = 'BZ-' + Math.floor(1000 + Math.random() * 9000);
                    const created = {
                      id: 'unit_' + Date.now(),
                      propertyId: newUnitForm.propertyId,
                      unitLabel: newUnitForm.unitLabel,
                      roomType: newUnitForm.roomType,
                      monthlyRent: parseFloat(newUnitForm.monthlyRent),
                      depositAmount: parseFloat(newUnitForm.depositAmount || '0'),
                      utilityMode: newUnitForm.utilityMode,
                      utilityNote: newUnitForm.utilityNote,
                      utilityAddonAmount: 0,
                      utilityBillProof: '',
                      dueDate: 'Nov 1, 2026',
                      tenantId: null,
                      inviteCode
                    };
                    setData((prev) => ({ ...prev, units: [...prev.units, created] }));
                    setActiveModal(null);
                    addToast(`Unit created with Invite Code: ${inviteCode}`, 'success');
                  }}
                  className="mt-4 space-y-3 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-semibold mb-1">Unit Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Apt 4C (1-Bedroom)"
                      value={newUnitForm.unitLabel}
                      onChange={(e) =>
                        setNewUnitForm({ ...newUnitForm, unitLabel: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Monthly Rent (BZD)</label>
                      <input
                        type="number"
                        required
                        value={newUnitForm.monthlyRent}
                        onChange={(e) =>
                          setNewUnitForm({ ...newUnitForm, monthlyRent: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Deposit (BZD)</label>
                      <input
                        type="number"
                        required
                        value={newUnitForm.depositAmount}
                        onChange={(e) =>
                          setNewUnitForm({ ...newUnitForm, depositAmount: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Utility Mode (BEL &amp; BWS)</label>
                    <select
                      value={newUnitForm.utilityMode}
                      onChange={(e) =>
                        setNewUnitForm({ ...newUnitForm, utilityMode: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    >
                      <option value="included">Water &amp; Light Included in Rent</option>
                      <option value="tenant_direct">Tenant Pays BEL &amp; BWS Directly</option>
                      <option value="landlord_billed">Landlord Billed Monthly Split</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-800 text-white font-semibold"
                  >
                    Create Unit &amp; Generate Invite
                  </button>
                </form>
              </div>
            )}

            {/* Modal: Edit Unit */}
            {activeModal.type === 'editUnit' && (
              <div className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900">Edit Unit Pricing &amp; Rules</h3>
                  <button onClick={() => setActiveModal(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setData((prev) => ({
                      ...prev,
                      units: prev.units.map((u) =>
                        u.id === activeModal.payload.id
                          ? {
                              ...u,
                              unitLabel: editUnitForm.unitLabel,
                              monthlyRent: parseFloat(editUnitForm.monthlyRent),
                              utilityMode: editUnitForm.utilityMode,
                              utilityNote: editUnitForm.utilityNote
                            }
                          : u
                      )
                    }));
                    setActiveModal(null);
                    addToast('Unit pricing and rules updated!', 'success');
                  }}
                  className="mt-4 space-y-3 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-semibold mb-1">Unit Name</label>
                    <input
                      type="text"
                      value={editUnitForm.unitLabel}
                      onChange={(e) =>
                        setEditUnitForm({ ...editUnitForm, unitLabel: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Monthly Rent (BZD)</label>
                    <input
                      type="number"
                      value={editUnitForm.monthlyRent}
                      onChange={(e) =>
                        setEditUnitForm({ ...editUnitForm, monthlyRent: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Utility Arrangement</label>
                    <select
                      value={editUnitForm.utilityMode}
                      onChange={(e) =>
                        setEditUnitForm({ ...editUnitForm, utilityMode: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    >
                      <option value="included">Water &amp; Light Included in Rent</option>
                      <option value="tenant_direct">Tenant Pays BEL &amp; BWS Directly</option>
                      <option value="landlord_billed">Landlord Billed Monthly Split</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-800 text-white font-semibold"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Modal: Monthly Utility Split */}
            {activeModal.type === 'utility' && (
              <div className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900">
                    Monthly BEL / BWS Utility Split
                  </h3>
                  <button onClick={() => setActiveModal(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const unit = activeModal.payload;
                    setData((prev) => ({
                      ...prev,
                      units: prev.units.map((u) =>
                        u.id === unit.id
                          ? {
                              ...u,
                              utilityAddonAmount: parseFloat(utilForm.amount) || 0,
                              utilityBillProof: utilForm.proof
                            }
                          : u
                      )
                    }));
                    if (unit.tenantId) {
                      pushNotification(
                        'tenant',
                        unit.tenantId,
                        'Monthly Utility Split Updated',
                        `Your ${data.billingMonth} utility share is ${formatBZD(utilForm.amount)} (${utilForm.proof}).`
                      );
                    }
                    setActiveModal(null);
                    addToast('Utility split updated!', 'success');
                  }}
                  className="mt-4 space-y-3 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-semibold mb-1">Utility Split Amount (BZD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={utilForm.amount}
                      onChange={(e) => setUtilForm({ ...utilForm, amount: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">BWS / BEL Reference Note</label>
                    <input
                      type="text"
                      value={utilForm.proof}
                      onChange={(e) => setUtilForm({ ...utilForm, proof: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-sky-600 text-white font-semibold"
                  >
                    Update Tenant Statement
                  </button>
                </form>
              </div>
            )}

            {/* Modal: Tenant Ledger Drilldown */}
            {activeModal.type === 'tenantLedger' && (() => {
              const tenant = activeModal.payload;
              const tenantPayments = data.payments
                .filter((p) => p.tenantId === tenant.id)
                .reverse();
              return (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-lg text-slate-900">
                      {tenant.fullName} — Ledger
                    </h3>
                    <button onClick={() => setActiveModal(null)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {tenantPayments.map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold">
                            {p.billingMonth} — {formatBZD(p.amount)}
                          </div>
                          <div className="text-slate-500">
                            {p.method} • {p.referenceNo}
                          </div>
                        </div>
                        {p.status === 'confirmed' ? (
                          <button
                            onClick={() =>
                              setActiveModal({ type: 'officialReceipt', payload: p })
                            }
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-semibold"
                          >
                            #{p.receiptNumber}
                          </button>
                        ) : (
                          <span className="capitalize text-indigo-700 font-semibold">
                            {p.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Modal: Reset Demo */}
            {activeModal.type === 'reset' && (
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Reset Demo Data?</h3>
                <p className="text-xs text-slate-600 mb-4">
                  This restores the initial Belizean landlord, tenants, and pending receipt queue.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const fresh = getInitialDemoData();
                      setData(fresh);
                      setBankForm(fresh.landlord.bankInstructions);
                      setActiveModal(null);
                      addToast('Demo data restored!', 'info');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
                  >
                    Yes, Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}