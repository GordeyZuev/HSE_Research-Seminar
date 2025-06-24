"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Circle,
  ExternalLink,
  BookOpen,
  Code,
  Database,
  Shield,
  Zap,
  Cloud,
  Network,
  Layers,
  MessageSquare,
  Settings,
  Eye,
  Globe,
  TestTube,
} from "lucide-react"

interface Topic {
  id: string
  title: string
  description: string
  keywords: string[]
  resources?: { title: string; url: string }[]
  completed: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  topics: Topic[]
}

const roadmapData: Section[] = [
  {
    id: "fundamentals",
    title: "1. Fundamentals",
    icon: <Code className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "languages",
        title: "Languages",
        description:
          "Обзор основных языков программирования для бэкенда, их экосистем и типичных сценариев применения.",
        keywords: ["Python", "Java", "JavaScript (Node.js)", "Go", "C#", "Ruby", "TypeScript"],
        resources: [
          { title: "Python Official Docs", url: "https://docs.python.org/3/" },
          { title: "Oracle Java Documentation", url: "https://docs.oracle.com/en/java/" },
        ],
        completed: false,
        difficulty: "beginner",
      },
      {
        id: "version-control",
        title: "Version Control & Workflows",
        description: "Принципы распределённого контроля версий Git и лучшие практики ветвления, слияний и код-ревью.",
        keywords: ["Git", "Gitflow", "Branching", "Pull Request", "Merge Conflicts", "Rebase", "CI Integration"],
        resources: [{ title: "Git SCM Book", url: "https://git-scm.com/book/en/v2" }],
        completed: false,
        difficulty: "beginner",
      },
      {
        id: "os-networking",
        title: "OS & Networking Basics",
        description: "Основы операционных систем (процессы, потоки) и сетевых протоколов TCP/IP, DNS, HTTP.",
        keywords: [
          "Processes & Threads",
          "Scheduling",
          "TCP vs UDP",
          "IP Addressing",
          "DNS Resolution",
          "HTTP/HTTPS",
          "Ports & Sockets",
        ],
        resources: [
          {
            title: "MDN Networking Fundamentals",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Networking",
          },
        ],
        completed: false,
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "architectural-patterns",
    title: "2. Architectural Patterns",
    icon: <Layers className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "monolithic",
        title: "Monolithic Applications",
        description: "Классическая архитектура с единым кодовым базисом и общим окружением развёртывания.",
        keywords: [
          "Single Codebase",
          "Module Boundaries",
          "Scaling Up",
          "Deployment Unit",
          "Tight Coupling",
          "CI/CD Pipeline",
        ],
        resources: [
          { title: "Martin Fowler – MonolithFirst", url: "https://martinfowler.com/bliki/MonolithFirst.html" },
        ],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "microservices-soa",
        title: "Microservices & SOA",
        description: "Декомпозиция на мелкие, автономные сервисы с независимым релизом и коммуникацией через API.",
        keywords: [
          "Service Discovery",
          "API Gateway",
          "Loose Coupling",
          "Circuit Breaker",
          "Domain-Driven Design",
          "Containerization",
        ],
        resources: [{ title: "Microservices.io Patterns", url: "https://microservices.io/" }],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "cqrs-event-sourcing",
        title: "CQRS & Event Sourcing",
        description: "Разделение операций чтения и записи (CQRS) и сохранение всей последовательности событий системы.",
        keywords: ["Command vs Query", "Event Store", "Projections", "Event Replay", "Immutability", "Snapshots"],
        resources: [
          { title: "Microsoft CQRS Guide", url: "https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs" },
        ],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "api-integration",
    title: "3. API & Integration",
    icon: <Network className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "restful-api",
        title: "RESTful API",
        description:
          "Проектирование ресурсно-ориентированных интерфейсов с CRUD-операциями, версионированием и HATEOAS.",
        keywords: ["CRUD", "HATEOAS", "URI Design", "Status Codes", "Pagination", "Rate Limiting"],
        resources: [{ title: "OpenAPI Specification", url: "https://swagger.io/specification/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "graphql",
        title: "GraphQL",
        description:
          "Запрос данных по схеме, где клиент определяет форму ответа; поддерживаются агрегированные запросы.",
        keywords: ["Schema", "Resolver", "Query & Mutation", "Apollo Server", "Introspection", "Subscriptions"],
        resources: [{ title: "GraphQL Official", url: "https://graphql.org/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "grpc",
        title: "gRPC",
        description: "Высокопроизводительный двоичный RPC-фреймворк поверх HTTP/2 с использованием Protocol Buffers.",
        keywords: [
          "Protocol Buffers",
          "Unary & Streaming",
          "HTTP/2",
          "Stub Generation",
          "Load Balancing",
          "Interceptors",
        ],
        resources: [{ title: "gRPC Documentation", url: "https://grpc.io/docs/" }],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "websockets-sse",
        title: "WebSockets & Server-Sent Events",
        description:
          "Постоянное двунаправленное (WebSockets) или одностороннее (SSE) соединение для реального времени.",
        keywords: ["Full-Duplex", "Event Stream", "Heartbeats", "Socket.IO", "Fallbacks", "Pub/Sub"],
        resources: [
          { title: "MDN WebSockets", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
        ],
        completed: false,
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "data-management",
    title: "4. Data Management",
    icon: <Database className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "relational-databases",
        title: "Relational Databases",
        description: "Структурированное хранение данных с ACID-транзакциями, индексами и механизмами репликации.",
        keywords: ["SQL", "ACID", "JOIN", "Indexing", "Sharding", "Replication"],
        resources: [{ title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "nosql-document",
        title: "NoSQL Databases: Document",
        description: "Гибкое хранение JSON-подобных документов, подходяще для динамических схем.",
        keywords: ["MongoDB", "CouchDB", "BSON", "Collections", "Aggregation Pipeline", "Denormalization"],
        resources: [{ title: "MongoDB Manual", url: "https://docs.mongodb.com/manual/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "nosql-keyvalue",
        title: "NoSQL Databases: Key-Value",
        description: 'Простейшая модель хранения пар "ключ-значение" для сверхбыстрых операций чтения/записи.',
        keywords: ["Redis", "DynamoDB", "In-Memory", "TTL", "Pub/Sub", "Persistence"],
        resources: [{ title: "Redis Documentation", url: "https://redis.io/documentation" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "nosql-column",
        title: "NoSQL Databases: Column",
        description:
          "Хранение данных в колонках для оптимизации аналитических запросов и горизонтального масштабирования.",
        keywords: ["Cassandra", "HBase", "Wide-Column", "Partition Key", "Clustering", "Compaction"],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "nosql-graph",
        title: "NoSQL Databases: Graph",
        description: "Хранение узлов и рёбер для эффективных графовых запросов и связей между сущностями.",
        keywords: ["Neo4j", "Nodes & Relationships", "Cypher", "Traversal", "Indexes", "Pathfinding"],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "nosql-timeseries",
        title: "NoSQL Databases: Time Series",
        description: "Оптимизированное хранение временных рядов с функциями агрегации и ретеншна.",
        keywords: ["InfluxDB", "TimescaleDB", "TSM Engine", "Continuous Queries", "Retention Policy", "Downsampling"],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "cap-theorem",
        title: "CAP Theorem & Data Modeling",
        description:
          "Баланс между согласованностью, доступностью и устойчивостью к разделению сети при проектировании хранилищ.",
        keywords: ["Consistency", "Availability", "Partition Tolerance", "BASE", "Normalization", "Denormalization"],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "caching-performance",
    title: "5. Caching & Performance",
    icon: <Zap className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "inmemory-caches",
        title: "In-Memory Caches",
        description: "Ускорение доступа к данным через кеширование в памяти с поддержкой TTL и отказоустойчивости.",
        keywords: ["Redis", "Memcached", "TTL", "Cache Eviction", "Cache Stampede", "Near Cache"],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "cdn-http-caching",
        title: "CDN & HTTP Caching",
        description: "Распределённое кеширование на границе сети и управление заголовками кеширования в HTTP.",
        keywords: ["CDN Providers", "Cache-Control", "ETag", "Vary Header", "Purge/Invalidate", "Edge Cache"],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "load-balancing",
        title: "Load Balancing & Rate Limiting",
        description: "Равномерное распределение трафика между инстансами и защита от перегрузок API.",
        keywords: ["Round Robin", "Sticky Sessions", "Nginx/HAProxy", "Token Bucket", "Throttling", "Circuit Breaker"],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "async-processing",
        title: "Asynchronous Processing & Backpressure",
        description: "Обработка фоновых задач через очереди и управление потоком данных в пиковых нагрузках.",
        keywords: ["Message Queue", "Worker Pool", "RabbitMQ", "Kafka", "Backpressure", "Batch Processing"],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "security",
    title: "6. Security",
    icon: <Shield className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "auth-authorization",
        title: "Authentication & Authorization",
        description: "Методы проверки личности и разграничения доступа: токены, OAuth2, ролевая модель.",
        keywords: ["JWT", "OAuth2", "OpenID Connect", "SAML", "RBAC", "ACL"],
        resources: [{ title: "OAuth2 RFC 6749", url: "https://tools.ietf.org/html/rfc6749" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "web-security",
        title: "Web Security",
        description: "Защита от веб-угроз: инъекции, XSS, CSRF, настройка CORS и CSP.",
        keywords: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF Token", "CORS", "Content Security Policy"],
        resources: [{ title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "data-encryption",
        title: "Data Encryption & Hashing",
        description: "Шифрование данных в движении и покое, стойкое хеширование паролей.",
        keywords: ["TLS/SSL", "AES", "RSA", "bcrypt", "scrypt", "Key Management"],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "containerization",
    title: "7. Containerization & Orchestration",
    icon: <Cloud className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "docker-compose",
        title: "Docker & Docker Compose",
        description: "Контейнеризация приложений, создание образов и локальное многоконтейнерное развёртывание.",
        keywords: ["Dockerfile", "Images & Containers", "Volumes", "Networks", "Compose YAML", "Multi-stage Builds"],
        resources: [{ title: "Docker Docs", url: "https://docs.docker.com/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "virtualization-containers",
        title: "Virtualization vs. Containers",
        description: "Сравнение полных виртуальных машин и лёгких контейнеров, их плюсы и минусы.",
        keywords: ["VM vs Container", "Hypervisor", "LXC", "Isolation", "Overhead", "Density"],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "kubernetes",
        title: "Kubernetes",
        description: "Оркестрация контейнеров: Pods, Services, Deployment, Helm-чарты для управления конфигурациями.",
        keywords: ["Pod", "Deployment & ReplicaSet", "Service", "Ingress", "Helm", "StatefulSet"],
        resources: [{ title: "Kubernetes Documentation", url: "https://kubernetes.io/docs/" }],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "messaging-eventing",
    title: "8. Messaging & Eventing",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "message-brokers",
        title: "Message Brokers",
        description: "Системы обмена сообщениями для надёжной доставки и буферизации задач.",
        keywords: [
          "RabbitMQ",
          "Apache Kafka",
          "Google Pub/Sub",
          "Exchanges & Topics",
          "Acknowledgements",
          "Persistence",
        ],
        resources: [{ title: "Kafka Documentation", url: "https://kafka.apache.org/documentation/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "messaging-patterns",
        title: "Messaging Patterns",
        description: "Шаблоны обмена сообщениями: Pub/Sub, Fan-out, Dead-letter, Competing Consumers.",
        keywords: ["Pub/Sub", "Fan-out", "Dead-letter Queue", "Competing Consumers", "Message Routing", "Backoff"],
        completed: false,
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "devops-deployment",
    title: "9. DevOps & Deployment",
    icon: <Settings className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "cicd-pipelines",
        title: "CI/CD Pipelines",
        description: "Автоматизация сборки, тестирования и релизов при помощи Jenkins, GitHub Actions, GitLab CI.",
        keywords: [
          "Pipeline as Code",
          "Build Agents",
          "Tests & Reporting",
          "Artifact Repositories",
          "Rollback",
          "Blue/Green Deployments",
        ],
        resources: [{ title: "GitHub Actions Docs", url: "https://docs.github.com/actions" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "infrastructure-as-code",
        title: "Infrastructure as Code",
        description: "Управление инфраструктурой через код (Terraform, Ansible, Pulumi) для воспроизводимости.",
        keywords: ["Terraform", "Ansible", "State Management", "Modules & Roles", "Immutable Infra", "Drift Detection"],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "gitops-immutable",
        title: "GitOps & Immutable Infrastructure",
        description:
          "Практики развёртывания, где Git — единственный источник правды, и инфраструктура не меняется вручную.",
        keywords: ["Flux", "Argo CD", "Declarative Config", "Git Repositories", "Rollback via Git", "Policy as Code"],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "observability",
    title: "10. Observability & Support",
    icon: <Eye className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "metrics-monitoring",
        title: "Metrics & Monitoring",
        description: "Сбор и визуализация метрик приложений и инфраструктуры через Prometheus и Grafana.",
        keywords: ["Prometheus", "Grafana", "Exporters", "Alertmanager", "SLO/SLI/SLA", "Dashboards"],
        resources: [{ title: "Prometheus Docs", url: "https://prometheus.io/docs/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "logging-tracing",
        title: "Logging & Tracing",
        description:
          "Централизованное логирование (ELK) и распределённый трейсинг (Jaeger) для быстрого анализа инцидентов.",
        keywords: ["ELK Stack", "Fluentd/Fluent Bit", "Logstash", "Jaeger", "OpenTelemetry", "Correlation IDs"],
        resources: [{ title: "OpenTelemetry", url: "https://opentelemetry.io/" }],
        completed: false,
        difficulty: "intermediate",
      },
      {
        id: "alerting-oncall",
        title: "Alerting & On-Call",
        description: "Настройка оповещений и процессов on-call с использованием Alertmanager и PagerDuty.",
        keywords: [
          "Alertmanager",
          "PagerDuty",
          "Escalation Policy",
          "Notification Channels",
          "Runbooks",
          "Severity Levels",
        ],
        completed: false,
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "serverless-edge",
    title: "11. Serverless & Edge",
    icon: <Globe className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "faas",
        title: "FaaS",
        description:
          "Функции как сервис: бессерверные вычисления с платой за исполнение (AWS Lambda, Azure Functions).",
        keywords: [
          "AWS Lambda",
          "Cold Start",
          "Event Triggers",
          "Function Packaging",
          "IAM Roles",
          "Serverless Framework",
        ],
        resources: [{ title: "AWS Lambda Developer Guide", url: "https://docs.aws.amazon.com/lambda/latest/dg/" }],
        completed: false,
        difficulty: "advanced",
      },
      {
        id: "edge-compute",
        title: "Edge Compute",
        description: "Вынос вычислений ближе к пользователю с помощью облачных воркеров и CDN Edge функций.",
        keywords: [
          "Cloudflare Workers",
          "AWS CloudFront Functions",
          "Low Latency",
          "Geo-Routing",
          "Workers KV",
          "Edge Caching",
        ],
        completed: false,
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "testing-quality",
    title: "12. Testing & Quality",
    icon: <TestTube className="w-5 h-5" />,
    color: "#3D6D56",
    topics: [
      {
        id: "testing-types",
        title: "Testing Types",
        description: "Виды тестирования: модульное, интеграционное, функциональное и end-to-end.",
        keywords: ["Unit Tests", "Integration Tests", "Functional Tests", "E2E Tests", "Mocking", "Test Coverage"],
        resources: [{ title: "Testing Pyramid", url: "https://martinfowler.com/bliki/TestPyramid.html" }],
        completed: false,
        difficulty: "beginner",
      },
      {
        id: "tdd-mocking",
        title: "Test-Driven Development & Mocking",
        description:
          "Практика TDD для обеспечения качества кода и использование заглушек/моков для изоляции зависимостей.",
        keywords: [
          "Red–Green–Refactor",
          "Mocks vs Stubs",
          "Dependency Injection",
          "PHPUnit / JUnit / Jest",
          "Fixtures",
          "Continuous Testing",
        ],
        completed: false,
        difficulty: "intermediate",
      },
    ],
  },
]

export default function BackendRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set())

  const toggleTopicCompletion = (topicId: string) => {
    const newCompleted = new Set(completedTopics)
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId)
    } else {
      newCompleted.add(topicId)
    }
    setCompletedTopics(newCompleted)
  }

  const totalTopics = roadmapData.reduce((acc, section) => acc + section.topics.length, 0)
  const completedCount = completedTopics.size
  const progressPercentage = (completedCount / totalTopics) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#438D69"
      case "intermediate":
        return "#F0BE6A"
      case "advanced":
        return "#CD6060"
      default:
        return "#C7C7C7"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Начальный"
      case "intermediate":
        return "Средний"
      case "advanced":
        return "Продвинутый"
      default:
        return "Неизвестно"
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#3D6D56" }}>
            Backend Developer Roadmap 2025 (by Gordey)
          </h1>
          <p className="text-lg text-gray-600 mb-6">Comprehensive step-by-step guide to becoming a Backend Developer</p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Learning Progress</span>
              <span>
                {completedCount}/{totalTopics} topics
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Roadmap */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {roadmapData.map((section, sectionIndex) => (
                <div key={section.id} className="relative">
                  {/* Section Header */}
                  <div className="flex items-center mb-8">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full text-white mr-4 shadow-lg"
                      style={{ backgroundColor: "#3D6D56" }}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: section.color }}>
                        {section.title}
                      </h2>
                      <p className="text-sm text-gray-500">{section.topics.length} topics</p>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="ml-8 grid gap-4 md:grid-cols-2">
                    {section.topics.map((topic, topicIndex) => (
                      <Card
                        key={topic.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                          selectedTopic?.id === topic.id ? "ring-2 shadow-lg" : ""
                        }`}
                        style={{
                          backgroundColor: completedTopics.has(topic.id) ? "#F3F4F6" : "white",
                          borderColor: selectedTopic?.id === topic.id ? section.color : "#E5E7EB",
                          borderWidth: selectedTopic?.id === topic.id ? "2px" : "1px",
                        }}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-8 w-8 mt-1 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleTopicCompletion(topic.id)
                                }}
                              >
                                {completedTopics.has(topic.id) ? (
                                  <CheckCircle className="w-6 h-6" style={{ color: "#3D6D56" }} />
                                ) : (
                                  <Circle className="w-6 h-6" style={{ color: "#C7C7C7" }} />
                                )}
                              </Button>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-base leading-tight mb-2">{topic.title}</CardTitle>
                                <div className="flex flex-wrap gap-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                    style={{
                                      backgroundColor: getDifficultyColor(topic.difficulty) + "20",
                                      color: getDifficultyColor(topic.difficulty),
                                    }}
                                  >
                                    {getDifficultyLabel(topic.difficulty)}
                                  </Badge>
                                  {topic.resources && topic.resources.length > 0 && (
                                    <Badge variant="outline" className="text-xs">
                                      {topic.resources.length} resource{topic.resources.length > 1 ? "s" : ""}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>

                  {/* Section Connector */}
                  {sectionIndex < roadmapData.length - 1 && (
                    <div className="flex justify-center mt-12 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8" style={{ backgroundColor: "#C7C7C7" }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#C7C7C7" }} />
                        <div className="w-0.5 h-8" style={{ backgroundColor: "#C7C7C7" }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Topic Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {selectedTopic ? (
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{selectedTopic.title}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => toggleTopicCompletion(selectedTopic.id)}>
                        {completedTopics.has(selectedTopic.id) ? (
                          <CheckCircle className="w-5 h-5" style={{ color: "#3D6D56" }} />
                        ) : (
                          <Circle className="w-5 h-5" style={{ color: "#C7C7C7" }} />
                        )}
                      </Button>
                    </div>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: getDifficultyColor(selectedTopic.difficulty) + "20",
                        color: getDifficultyColor(selectedTopic.difficulty),
                        width: "fit-content",
                      }}
                    >
                      {getDifficultyLabel(selectedTopic.difficulty)}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-6 leading-relaxed">
                      {selectedTopic.description}
                    </CardDescription>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Terms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTopic.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedTopic.resources && selectedTopic.resources.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Resources:</h4>
                        <div className="space-y-3">
                          {selectedTopic.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm hover:underline p-2 rounded-md hover:bg-gray-50 transition-colors"
                              style={{ color: "#3D6D56" }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="break-words">{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-center text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="font-semibold mb-2">Select a Topic</h3>
                      <p className="text-sm">
                        Click on any topic to view detailed information, key terms, and learning resources.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
