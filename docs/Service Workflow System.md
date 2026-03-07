# Service Workflow System — Full Specification
### Marketplace Platform | Industry-Standard SDLC + Revision + Legal Flow

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Package Configuration](#2-package-configuration)
3. [Complete Phase Workflow](#3-complete-phase-workflow)
4. [Phase-by-Phase Detail](#4-phase-by-phase-detail)
5. [Revision System](#5-revision-system)
6. [Support Window System](#6-support-window-system)
7. [Legal & Compliance Documents](#7-legal--compliance-documents)
8. [Timeline & Auto-Progression Rules](#8-timeline--auto-progression-rules)
9. [Notifications & Communication](#9-notifications--communication)
10. [Database Schema](#10-database-schema)
11. [Admin Panel Workflow](#11-admin-panel-workflow)
12. [Customer Dashboard View](#12-customer-dashboard-view)
13. [Edge Cases & Business Rules](#13-edge-cases--business-rules)

---

## 1. System Overview

Every service order on the platform follows a structured lifecycle from purchase to project completion. The lifecycle is broken into SDLC-aligned phases, each requiring the admin/provider to submit documented deliverables before advancing. Progress percentage is calculated from completed phase weights. The system enforces transparency at every step — customers see exactly what phase their project is in, what was delivered, and what comes next.

**Core Principles:**
- No phase can be skipped
- No phase can be marked complete without required deliverables submitted
- All legal documents are collected before work begins
- Revision windows are time-boxed and credit-limited per package
- Support window opens automatically after revisions close
- Project auto-completes when support window expires with no open tickets

---

## 2. Package Configuration

Each service has packages (Basic, Standard, Premium). The following fields are configured per package:

| Field | Basic | Standard | Premium |
|---|---|---|---|
| `revisions_allowed` | 1 | 3 | Unlimited (-1) |
| `revision_window_days` | 7 | 30 | 60 |
| `support_window_days` | 7 | 14 | 30 |
| `nda_required` | false | true | true |
| `sow_required` | false | true | true |
| `legal_sign_required` | false | true | true |

> **Rule:** `revisions_allowed = -1` means unlimited revisions within the revision window period. Once the window expires, no further revisions are accepted regardless of count.

---

## 3. Complete Phase Workflow

```
[ORDER PLACED]
      |
      v
[Phase 1] Requirements Gathering         (10%)
      |
      v  Admin submits: confirmed requirements doc
      |
[Phase 2] Legal & Documentation          (5%)
      |
      v  Admin sends: NDA, SOW, contracts → Customer signs
      |
[Phase 3] Planning & Scoping             (10%)
      |
      v  Admin submits: scope doc, timeline
      |
[Phase 4] Design                         (15%)
      |  ← Customer Approval Gate
      v  Admin submits: wireframes, mockups, design files
      |
[Phase 5] Development                    (25%)
      |
      v  Admin submits: staging link, build notes
      |
[Phase 6] Testing & QA                   (10%)
      |
      v  Admin submits: test report, bug fix summary
      |
[Phase 7] Delivery                       (10%)
      |  ← Customer Approval Gate
      v  Admin submits: final files, deployment link, handover notes
      |
[Phase 8] Revision Window Opens
      |
      |--- Revision 1 requested → In Revision → Completed → (credits--)
      |--- Revision 2 requested → In Revision → Completed → (credits--)
      |--- Revision N requested → In Revision → Completed → (credits--)
      |
      |  [Window expires OR credits exhausted] → Revision Phase Closed (10%)
      |
[Phase 9] Support Window                 (5%)
      |
      v  Customer raises tickets → resolved within window
      |
      |  [Window expires OR customer signs off]
      |
[COMPLETED]                              (100%)
```

**Overall Progress Calculation:**

| Phase | Weight | Cumulative |
|---|---|---|
| Requirements Gathering | 10% | 10% |
| Legal & Documentation | 5% | 15% |
| Planning & Scoping | 10% | 25% |
| Design | 15% | 40% |
| Development | 25% | 65% |
| Testing & QA | 10% | 75% |
| Delivery | 10% | 85% |
| Revisions | 10% | 95% |
| Support Window | 5% | 100% |

---

## 4. Phase-by-Phase Detail

---

### Phase 1 — Requirements Gathering

**Triggered by:** Order payment confirmed

**Admin Actions:**
- Review order details and customer-submitted requirement form
- Contact customer if clarification needed (via Messages tab)
- Confirm and document final requirements

**Required Deliverables before marking complete:**
- [ ] Requirements summary document (PDF/text)
- [ ] Any customer-supplied assets acknowledged (logos, content, branding)
- [ ] Admin confirmation note: "Requirements confirmed and understood"

**Customer sees:**
- Timeline event: "Requirements reviewed and confirmed"
- Downloadable: Requirements Summary

**Blocks next phase if:** Requirements doc not submitted

---

### Phase 2 — Legal & Documentation

**Triggered by:** Phase 1 completion

**Admin Actions:**
- Generate applicable legal documents based on package tier
- Send documents to customer for e-signature
- Wait for all signatures before proceeding

**Documents by package tier:**

| Document | Basic | Standard | Premium |
|---|---|---|---|
| Order Confirmation | ✅ | ✅ | ✅ |
| Terms of Service Acknowledgement | ✅ | ✅ | ✅ |
| Non-Disclosure Agreement (NDA) | ❌ | ✅ | ✅ |
| Statement of Work (SOW) | ❌ | ✅ | ✅ |
| Intellectual Property Transfer Agreement | ❌ | ✅ | ✅ |
| Revision & Support Policy Agreement | ✅ | ✅ | ✅ |
| Custom Contract (if applicable) | ❌ | ❌ | ✅ |

**Required Deliverables before marking complete:**
- [ ] All documents sent to customer (timestamp logged)
- [ ] All required signatures received (e-signature or upload)
- [ ] Signed copies stored in Files & Assets tab

**Customer Action Required:**
- Customer must sign all documents before this phase can complete
- A "Sign Documents" CTA appears on their dashboard
- Reminder notification sent at 24h and 48h if unsigned

**Blocks next phase if:** Any required document unsigned

---

### Phase 3 — Planning & Scoping

**Triggered by:** All legal documents signed

**Admin Actions:**
- Define project scope, milestones, and internal timeline
- Share scope document with customer

**Required Deliverables before marking complete:**
- [ ] Scope of Work document
- [ ] Internal milestone breakdown
- [ ] Estimated delivery date set in system
- [ ] Admin note summarizing the plan

**Customer sees:**
- Timeline event: "Project plan shared"
- Downloadable: Scope Document
- Updated Est. Delivery date shown in Project Stats

---

### Phase 4 — Design

**Triggered by:** Phase 3 completion

**Admin Actions:**
- Create wireframes, mockups, or design files
- Share with customer for review and approval
- Implement feedback if requested (counts as design iteration, not revision credit)

**Required Deliverables before marking complete:**
- [ ] Wireframe files (image/PDF) OR Figma/design tool link
- [ ] Mobile responsive layouts (if applicable)
- [ ] Customer approval recorded (approval gate — see below)
- [ ] Admin notes on design decisions

**⚠️ Customer Approval Gate:**
- Admin submits design deliverables → customer notified
- Customer must click "Approve Design" on dashboard
- Customer can also send feedback via Messages
- Phase cannot advance until customer approval is logged
- If no response in 5 days → auto-approval with notification

---

### Phase 5 — Development

**Triggered by:** Design approval

**Admin Actions:**
- Build the product per approved design and scope
- Deploy to staging environment
- Share staging link with customer

**Required Deliverables before marking complete:**
- [ ] Staging/preview link
- [ ] Repository link (if applicable and agreed)
- [ ] Build notes (what was built, technologies used)
- [ ] Known limitations or deferred items noted

**Customer sees:**
- Staging link to preview their product
- Build notes summary

---

### Phase 6 — Testing & QA

**Triggered by:** Phase 5 completion

**Admin Actions:**
- Run functional testing across browsers/devices
- Fix all critical bugs
- Document test results

**Required Deliverables before marking complete:**
- [ ] QA checklist completed (cross-browser, mobile, forms, links)
- [ ] Bug fix summary (what was found and fixed)
- [ ] Performance notes (if applicable)
- [ ] Final staging link confirmed working

---

### Phase 7 — Delivery

**Triggered by:** Phase 6 completion

**Admin Actions:**
- Deploy to production OR package final files
- Hand over all assets to customer
- Provide handover documentation

**Required Deliverables before marking complete:**
- [ ] Final files (ZIP, Google Drive, or direct upload)
- [ ] Live deployment link OR download link
- [ ] Handover notes (how to use, update, or manage the product)
- [ ] Credentials / access details (via secure channel)
- [ ] Invoice / delivery receipt generated

**⚠️ Customer Approval Gate:**
- Customer must click "Accept Delivery" on dashboard
- If no response in 7 days → auto-accepted with notification
- After acceptance → Revision Window opens automatically

---

## 5. Revision System

### How It Works

After Delivery is accepted, the Revision Window opens immediately. The window duration and number of allowed revisions are defined by the customer's package.

**Revision Window States:**

```
OPEN → Customer can submit revision requests
IN_REVISION → A revision request is being worked on
EXHAUSTED → All revision credits used (window may still be open)
EXPIRED → Window time has passed
CLOSED → Window closed (either exhausted or expired)
```

### Revision Request Flow

```
Customer submits Revision Request
  → Describes changes needed
  → Attaches reference files (optional)
  → 1 revision credit deducted immediately
        |
        v
Admin reviews request
  → Accepts or flags as out-of-scope
        |
   [In-scope] → Admin works on revision
        |          → Submits revised deliverables
        |          → Phase shown as "In Revision"
        |          → Customer notified when done
        |          → Customer reviews
        |
   [Out-of-scope] → Admin flags with explanation
        |            → Credit refunded
        |            → Customer can purchase addon or re-scope
        v
Revision marked complete
  → Credit count updated
  → If credits remaining AND window open → customer can request again
  → If credits = 0 → "Purchase Additional Revision" CTA shown
  → If window expired → revision section locked
```

### Revision Timeline Display (Customer View)

```
✅ Delivery Accepted — Mar 5, 2026
   └── Revision Window: Open until Apr 4, 2026 (30 days)
   └── Credits: 3 remaining / 3 total

🔄 Revision 1 — Requested Mar 7, 2026
   └── Status: Completed Mar 9, 2026
   └── Changes: "Updated hero section copy and contact form layout"
   └── [View Changes] [Download Updated Files]

⏳ Revision 2 — Requested Mar 12, 2026
   └── Status: In Progress
   └── Credits remaining: 1
```

### Revision Deliverables (Admin must submit)

For each revision completion, admin must provide:
- [ ] Summary of changes made
- [ ] Updated files (if applicable)
- [ ] Updated live/staging link
- [ ] Notes on what was changed and why

### Auto-Close Rules

| Condition | Action |
|---|---|
| Revision window expires, no open requests | Phase auto-closes → Support Window opens |
| All credits used | Revision section locked, CTA shown for addon |
| Customer clicks "Close Revisions Early" | Phase closes → Support Window opens |
| Admin marks window closed manually | Phase closes with admin note |

---

## 6. Support Window System

### How It Works

The Support Window opens automatically when the Revision phase closes. Duration is set by package. During this window, the customer can raise support tickets scoped to this specific order.

**Support Ticket Types:**

| Type | Description | SLA |
|---|---|---|
| Bug | Something not working as delivered | 24 hours |
| Question | How-to or usage question | 48 hours |
| Content Update | Minor text/image change | 72 hours |
| Enhancement | New feature outside original scope | Not covered — new order |

**Rules:**
- Enhancement requests are not covered under support — admin redirects to new order
- Bugs found within the support window are fixed at no charge
- Questions are answered within SLA
- Content updates may be covered depending on package (admin discretion)

### Support Window Auto-Close

| Condition | Action |
|---|---|
| Window expires with no open tickets | Project auto-marked Complete (100%) |
| Window expires with open tickets | Tickets must be resolved first OR admin closes with note |
| Customer clicks "Mark Project Complete" | Project closed early, window ends |
| All tickets resolved before window ends | Customer prompted to close early or wait |

### After Support Window Closes

- Project status → **COMPLETED**
- All deliverables archived and accessible in Files & Assets forever
- Customer can re-open work only via a new order
- A "Start New Project" CTA is shown

---

## 7. Legal & Compliance Documents

### Documents Overview

All documents are generated from templates stored per service type. Populated with order details automatically.

---

#### 7.1 Order Confirmation

**When generated:** Immediately on payment success
**Contents:**
- Order ID, date, service name, package
- Total amount paid, payment method
- Provider details, customer details
- Summary of what is included

---

#### 7.2 Terms of Service Acknowledgement

**When generated:** Phase 2 (Legal)
**Customer must:** Check a box on dashboard confirming they have read and agree
**Contents:**
- Platform usage terms
- Payment and refund policy
- Dispute resolution process
- Limitation of liability

---

#### 7.3 Non-Disclosure Agreement (NDA)

**When generated:** Phase 2, Standard & Premium only
**Both parties sign:** Provider and Customer
**Contents:**
- Definition of confidential information
- Obligations of both parties
- Duration (typically 2 years post-project)
- Permitted disclosures (e.g. for portfolio — unless customer opts out)
- Governing law and jurisdiction

**Important field:** `portfolio_use_permitted` — customer can opt out of provider using project in portfolio

---

#### 7.4 Statement of Work (SOW)

**When generated:** Phase 2, Standard & Premium only
**Contents:**
- Detailed scope of work (pulled from Phase 3 planning doc)
- Deliverables list
- Timeline and milestones
- Assumptions and exclusions
- Change request process (anything outside SOW = new order or change order)
- Acceptance criteria

---

#### 7.5 Intellectual Property Transfer Agreement

**When generated:** Phase 2, Standard & Premium only
**Contents:**
- Upon full payment, all IP transfers to customer
- Provider retains no rights to the work product
- Exception: any third-party licenses (fonts, stock images, plugins) remain under their respective licenses
- Customer is responsible for renewing third-party licenses post-delivery

---

#### 7.6 Revision & Support Policy Agreement

**When generated:** Phase 2, all packages
**Contents:**
- Number of revisions included per package
- Definition of what counts as a revision vs. a new requirement
- Revision window duration
- Support window duration and what is covered
- What happens when window expires
- How to purchase additional revisions

---

#### 7.7 Change Order Document (On-demand)

**When generated:** When admin flags a revision request as out-of-scope
**Contents:**
- Original SOW reference
- Description of new/changed requirement
- Additional cost (if any)
- Revised timeline impact
- Must be signed before out-of-scope work begins

---

#### 7.8 Project Completion Certificate

**When generated:** When project reaches 100% Completed
**Contents:**
- Order details
- All phases completed with dates
- Final deliverables list
- Confirmation that support window has closed
- Both parties acknowledgement
- Issued as a signed PDF, downloadable from dashboard

---

### Document Storage & Access

- All documents stored per order in `Files & Assets` tab
- Customer can download any signed document at any time
- Documents are versioned (e.g. if SOW is amended via change order)
- Admin can upload additional documents at any phase

---

## 8. Timeline & Auto-Progression Rules

### Phase Deadline Enforcement

Each phase has an expected duration (configured per service type):

| Phase | Expected Duration |
|---|---|
| Requirements Gathering | 1 day |
| Legal & Documentation | 2 days (waiting for customer signatures) |
| Planning & Scoping | 1 day |
| Design | 3–5 days |
| Development | 5–14 days (varies by service) |
| Testing & QA | 1–2 days |
| Delivery | 1 day |
| Revision (per revision) | 2–3 days |
| Support Window | Per package |

### Delay Handling

- If a phase exceeds expected duration → Est. Delivery date shown in **red** as "DELAYED"
- Admin must log a delay reason when marking a phase late
- Customer receives a notification with updated estimate
- Delay reasons are visible in the timeline on the customer dashboard

### Auto-Progression Events (Cron-based)

| Event | Trigger | Action |
|---|---|---|
| Design approval timeout | 5 days after design submitted, no customer response | Auto-approve, log event, notify customer |
| Delivery acceptance timeout | 7 days after delivery submitted, no response | Auto-accept, open revision window |
| Revision window expiry | `revision_window_days` after delivery accepted | Close revision phase, open support window |
| Support window expiry | `support_window_days` after support window opened | Mark project complete, generate completion certificate |
| Legal signing reminder | 24h and 48h after docs sent, unsigned | Send reminder notification to customer |

---

## 9. Notifications & Communication

### Notification Triggers

| Event | Who is Notified | Channel |
|---|---|---|
| Order placed | Admin | Email + Dashboard |
| Payment confirmed | Customer + Admin | Email + Dashboard |
| Phase completed | Customer | Email + Dashboard |
| Legal docs sent | Customer | Email + Dashboard |
| Legal docs signed | Admin | Dashboard |
| Customer approval required | Customer | Email + Dashboard |
| Customer approved/rejected | Admin | Dashboard |
| Revision requested | Admin | Email + Dashboard |
| Revision completed | Customer | Email + Dashboard |
| Revision window closing (3 days) | Customer | Email + Dashboard |
| Revision window expired | Customer | Dashboard |
| Support window closing (3 days) | Customer | Email + Dashboard |
| Support ticket raised | Admin | Email + Dashboard |
| Support ticket resolved | Customer | Email + Dashboard |
| Project completed | Customer + Admin | Email + Dashboard |

### Messages Tab

- All communications logged in Messages tab per order
- Admin and customer can message directly within the order
- File attachments supported (max 50MB per file)
- Messages are timestamped and cannot be deleted (audit trail)

---

## 10. Database Schema

### Core Tables

```sql
-- Service package configuration
service_packages (
  id                    UUID PRIMARY KEY,
  service_id            UUID REFERENCES services(id),
  name                  VARCHAR,           -- 'basic', 'standard', 'premium'
  price                 DECIMAL,
  revisions_allowed     INT,               -- -1 = unlimited
  revision_window_days  INT,
  support_window_days   INT,
  nda_required          BOOLEAN,
  sow_required          BOOLEAN,
  ip_transfer_required  BOOLEAN,
  created_at            TIMESTAMP
)

-- Each customer order
orders (
  id                    UUID PRIMARY KEY,
  order_number          VARCHAR UNIQUE,    -- ORD-000006
  customer_id           UUID REFERENCES users(id),
  service_id            UUID REFERENCES services(id),
  package_id            UUID REFERENCES service_packages(id),
  status                VARCHAR,           -- confirmed, in_progress, completed, cancelled
  current_phase         VARCHAR,
  overall_progress      INT,               -- 0-100
  total_amount          DECIMAL,
  currency              VARCHAR,
  payment_status        VARCHAR,
  start_date            DATE,
  estimated_delivery    DATE,
  actual_delivery       DATE,
  revision_window_opens_at  TIMESTAMP,
  revision_window_closes_at TIMESTAMP,
  support_window_opens_at   TIMESTAMP,
  support_window_closes_at  TIMESTAMP,
  revisions_used        INT DEFAULT 0,
  completed_at          TIMESTAMP,
  created_at            TIMESTAMP
)

-- Phase template definitions per service type
phase_templates (
  id                    UUID PRIMARY KEY,
  service_type          VARCHAR,
  phase_key             VARCHAR,           -- 'requirements', 'legal', 'design', etc.
  phase_name            VARCHAR,
  phase_order           INT,
  weight_percent        INT,
  expected_duration_days INT,
  requires_customer_approval BOOLEAN,
  created_at            TIMESTAMP
)

-- Deliverable field templates per phase
phase_deliverable_templates (
  id                    UUID PRIMARY KEY,
  phase_template_id     UUID REFERENCES phase_templates(id),
  label                 VARCHAR,           -- 'Wireframes uploaded'
  deliverable_type      VARCHAR,           -- 'file' | 'link' | 'checkbox' | 'text'
  is_required           BOOLEAN,
  display_order         INT
)

-- Actual phase records per order
order_phases (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  phase_key             VARCHAR,
  phase_name            VARCHAR,
  phase_order           INT,
  weight_percent        INT,
  status                VARCHAR,           -- pending, in_progress, awaiting_approval, completed, delayed
  started_at            TIMESTAMP,
  completed_at          TIMESTAMP,
  expected_completion   TIMESTAMP,
  delay_reason          TEXT,
  admin_notes           TEXT,
  submitted_by          UUID REFERENCES users(id)
)

-- Deliverable submissions per phase
order_phase_deliverables (
  id                    UUID PRIMARY KEY,
  order_phase_id        UUID REFERENCES order_phases(id),
  order_id              UUID REFERENCES orders(id),
  submitted_by          UUID REFERENCES users(id),
  submitted_at          TIMESTAMP,
  status                VARCHAR,           -- draft | submitted
  notes                 TEXT
)

-- Individual deliverable items
order_phase_deliverable_items (
  id                    UUID PRIMARY KEY,
  order_phase_deliverable_id UUID REFERENCES order_phase_deliverables(id),
  template_id           UUID REFERENCES phase_deliverable_templates(id),
  label                 VARCHAR,
  value_text            TEXT,
  value_file_url        VARCHAR,
  value_link            VARCHAR,
  value_checked         BOOLEAN,
  is_completed          BOOLEAN,
  uploaded_at           TIMESTAMP
)

-- Customer approval gates
order_approvals (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  order_phase_id        UUID REFERENCES order_phases(id),
  approval_type         VARCHAR,           -- 'design_approval' | 'delivery_acceptance'
  status                VARCHAR,           -- pending | approved | rejected | auto_approved
  requested_at          TIMESTAMP,
  responded_at          TIMESTAMP,
  auto_approved_at      TIMESTAMP,
  customer_notes        TEXT
)

-- Revision requests
order_revisions (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  revision_number       INT,               -- 1, 2, 3...
  requested_by          UUID REFERENCES users(id),
  requested_at          TIMESTAMP,
  description           TEXT,
  attachment_urls       TEXT[],
  status                VARCHAR,           -- pending | accepted | in_progress | completed | rejected_out_of_scope
  is_out_of_scope       BOOLEAN DEFAULT FALSE,
  out_of_scope_reason   TEXT,
  credit_refunded       BOOLEAN DEFAULT FALSE,
  started_at            TIMESTAMP,
  completed_at          TIMESTAMP,
  admin_notes           TEXT,
  change_summary        TEXT,
  updated_file_urls     TEXT[]
)

-- Legal documents per order
order_legal_documents (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  document_type         VARCHAR,           -- 'nda' | 'sow' | 'ip_transfer' | 'tos' | 'revision_policy' | 'change_order' | 'completion_certificate'
  document_url          VARCHAR,
  version               INT DEFAULT 1,
  status                VARCHAR,           -- generated | sent | signed | expired
  sent_at               TIMESTAMP,
  signed_at             TIMESTAMP,
  signed_by_customer    BOOLEAN DEFAULT FALSE,
  signed_by_provider    BOOLEAN DEFAULT FALSE,
  portfolio_use_permitted BOOLEAN DEFAULT TRUE,
  expires_at            TIMESTAMP,
  created_at            TIMESTAMP
)

-- Support tickets per order
order_support_tickets (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  raised_by             UUID REFERENCES users(id),
  ticket_number         VARCHAR,
  type                  VARCHAR,           -- 'bug' | 'question' | 'content_update' | 'enhancement'
  priority              VARCHAR,           -- 'low' | 'medium' | 'high'
  title                 VARCHAR,
  description           TEXT,
  attachment_urls       TEXT[],
  status                VARCHAR,           -- open | in_progress | resolved | closed | rejected
  is_within_support_window BOOLEAN,
  sla_deadline          TIMESTAMP,
  opened_at             TIMESTAMP,
  resolved_at           TIMESTAMP,
  resolution_notes      TEXT,
  assigned_to           UUID REFERENCES users(id)
)

-- Order messages/communications
order_messages (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  sent_by               UUID REFERENCES users(id),
  sender_role           VARCHAR,           -- 'customer' | 'admin' | 'system'
  message               TEXT,
  attachment_urls       TEXT[],
  sent_at               TIMESTAMP,
  read_at               TIMESTAMP
)

-- Audit log for all phase/status changes
order_audit_log (
  id                    UUID PRIMARY KEY,
  order_id              UUID REFERENCES orders(id),
  action                VARCHAR,
  performed_by          UUID REFERENCES users(id),
  performer_role        VARCHAR,
  old_value             JSONB,
  new_value             JSONB,
  notes                 TEXT,
  performed_at          TIMESTAMP
)
```

---

## 11. Admin Panel Workflow

### Order Detail View (Admin)

Admin sees all the same phases as the customer, plus:
- "Mark Phase Complete" button on active phase
- Full phase completion form (see below)
- Ability to upload documents
- Ability to set delay reasons
- Support ticket management

### Phase Completion Form (Admin)

When admin clicks "Mark Phase Complete":

```
┌─────────────────────────────────────────────┐
│  Complete Phase: Design                      │
│─────────────────────────────────────────────│
│  Deliverables Checklist:                    │
│  ✅ Wireframes uploaded          [required] │
│  ✅ Figma design link            [required] │
│  ✅ Mobile layout included       [required] │
│  ✅ Customer approval received   [required] │
│                                             │
│  File Uploads:                              │
│  [+ Upload Files]  wireframes_v2.pdf ✅    │
│                                             │
│  Links:                                     │
│  Figma: [https://figma.com/...]            │
│                                             │
│  Admin Notes:                               │
│  [Homepage, About, Contact pages designed. │
│   Mobile responsive. Customer approved.]   │
│                                             │
│  [Save Draft]         [Mark Complete ✅]   │
│  (blocked if required items incomplete)    │
└─────────────────────────────────────────────┘
```

**Validation:**
- All `is_required` deliverables must be filled
- "Mark Complete" button disabled until validation passes
- Saving as draft allowed anytime

### Revision Management (Admin)

When a revision request comes in:
1. Admin sees request with description and attachments
2. Admin chooses: "Accept" or "Flag as Out of Scope"
3. If out of scope → write explanation → credit refunded → change order generated
4. If accepted → work on it → submit revision deliverables → mark complete

### Support Ticket Management (Admin)

- Inbox view of all open tickets sorted by SLA deadline
- Ticket detail view with full conversation thread
- Mark as: In Progress → Resolved
- Add resolution notes
- If enhancement → admin flags as "New Order Required"

---

## 12. Customer Dashboard View

### Timeline Component

Each phase shows as a step in the vertical timeline:

```
✅ Requirements Gathered — Feb 24, 2026
   └── 📄 Requirements Summary [Download]
   └── "Your project requirements have been confirmed."

✅ Legal Documents Signed — Feb 25, 2026
   └── 📄 NDA [Download]  📄 Statement of Work [Download]
   └── 📄 IP Transfer Agreement [Download]

✅ Planning Complete — Feb 25, 2026
   └── 📄 Scope Document [Download]
   └── "Est. delivery: Mar 5, 2026"

🔄 Design — In Progress (Est. 3 days)
   └── "Your wireframes are being created."

⏳ Development — Pending
⏳ Testing & QA — Pending
⏳ Delivery — Pending
⏳ Revisions — Pending
⏳ Support — Pending
```

### Project Stats Panel

```
Overall Progress      ████████░░░░  65%
Start Date            Feb 24, 2026
Est. Delivery         Mar 5, 2026  ⚠️ DELAYED BY 2 DAYS
Total Amount          ₹1,048.95
Payment Status        ✅ Completed
Revisions Used        1 / 3
Revision Window       Open until Apr 4, 2026 (22 days left)
Support Window        Opens after revisions close
```

### Revision Section (Customer)

```
[+ Request Revision]   (disabled if credits = 0 or window expired)

Revision 1 — ✅ Completed Mar 9
  "Updated hero text and CTA button color"
  [View Changes]

Revision 2 — 🔄 In Progress
  Requested Mar 12 — "Fix mobile menu not closing"
  Credits remaining: 1

Window closes: Apr 4, 2026
```

---

## 13. Edge Cases & Business Rules

| Scenario | Rule |
|---|---|
| Customer doesn't sign legal docs within 5 days | Reminder sent at 24h, 48h. Admin alerted on day 5. Project on hold. |
| Admin marks wrong phase complete | Admin can revert last phase (with audit log entry + reason) |
| Customer requests revision after window closed | System blocks request, shows "Revision window has expired" with option to purchase support plan |
| Revision is out of scope | Credit refunded, change order generated, work doesn't start until customer approves change order |
| Customer disputes delivery | Dispute ticket raised, escalated to platform admin, project frozen |
| Customer goes dark during approval gate | Auto-approval after timeout, all events logged |
| Support ticket raised after window closes | Ticket created with flag "outside support window", admin notified, customer informed this may be chargeable |
| Order cancelled mid-project | Cancellation policy applied per service terms, partial refund calculated based on phases completed, signed cancellation agreement generated |
| Provider misses SLA on support ticket | Alert triggered to platform admin, escalation flow begins |
| Revision count exhausted but window still open | "Purchase Additional Revision" addon shown — creates a new revision credit, charged separately |

---

## Appendix A — Phase Keys Reference

```
requirements_gathering
legal_documentation
planning_scoping
design
development
testing_qa
delivery
revision
support_window
```

## Appendix B — Document Types Reference

```
order_confirmation
tos_acknowledgement
nda
sow
ip_transfer
revision_policy
change_order
completion_certificate
```

## Appendix C — Order Status Values

```
payment_pending
confirmed
in_progress
awaiting_customer_action
in_revision
support_window_open
completed
cancelled
disputed
```

---

*Document version: 1.0 | For use as AI implementation prompt and developer reference*
